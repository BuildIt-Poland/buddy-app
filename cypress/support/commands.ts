import { graphql, GraphQLError } from 'graphql';
import { buildClientSchema, printSchema } from 'graphql';
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  IMocks,
} from 'graphql-tools';
import introspectionSchema, { UserRole } from 'buddy-app-schema';
import commonMocks from '../fixtures/graphql-mocks';

interface MockGraphQLOptions<AllOperations extends Record<string, any>> {
  schema: object | string | string[];
  name?: string;
  mocks?: IMocks;
  endpoint?: string;
  operations?: Partial<AllOperations>;
  delay?: number;
}

interface SetOperationsOpts<AllOperations> {
  name?: string;
  endpoint?: string;
  operations?: Partial<AllOperations>;
  delay?: number;
}

interface GQLRequestPayload<AllOperations extends Record<string, any>> {
  operationName: Extract<keyof AllOperations, string>;
  query: string;
  variables: any;
}

declare global {
  namespace Cypress {
    interface Chainable {
      mockGraphql<AllOperations = any>(
        options?: MockGraphQLOptions<AllOperations>
      ): Cypress.Chainable;
      mockGraphqlOps<AllOperations = any>(
        options?: SetOperationsOpts<AllOperations>
      ): Cypress.Chainable;
      dataTest: (value: string) => Chainable<Element>;
      login: (role: UserRole) => void;
    }
  }
}

export const REQUEST_DELAY = 100;

const dataTest = (value: string): Cypress.Chainable<JQuery> => {
  return cy.get(`[data-testid=${value}]`);
};

const login = (role: UserRole): void => {
  cy.mockGraphqlOps({
    delay: REQUEST_DELAY,
    operations: {
      LoginMutation: {
        login: {
          role,
        },
      },
    },
  });
  cy.dataTest('email').type('test@test.com');
  cy.dataTest('password').type('12345');
  cy.dataTest('submit-button').click();
  cy.wait(REQUEST_DELAY);
};

const getAlias = ({ name, endpoint }: { name?: string; endpoint?: string }) => {
  if (name || endpoint) {
    return `mockGraphqlOps:${name || endpoint}`;
  }
  return 'mockGraphqlOps';
};

const schemaAsSDL = (schema: string | string[] | object) => {
  if (typeof schema === 'string' || Array.isArray(schema)) {
    return schema;
  }
  return printSchema(buildClientSchema(introspectionSchema as any));
};

const getRootValue = <AllOperations>(
  operations: Partial<AllOperations>,
  operationName: Extract<keyof AllOperations, string>,
  variables: any
) => {
  if (!operationName || !operations[operationName]) {
    return {};
  }
  const op = operations[operationName];
  if (typeof op === 'function') {
    return op(variables);
  }
  return op;
};

const wait = (timeout: number) => <T>(response?: T) =>
  new Promise<T>(resolve => setTimeout(() => resolve(response), timeout));

Cypress.Commands.add('dataTest', dataTest);

Cypress.Commands.add('login', login);

Cypress.Commands.add(
  'mockGraphql',
  <AllOperations extends Record<string, any>>(
    options: MockGraphQLOptions<AllOperations>
  ) => {
    const {
      endpoint = '/graphql',
      delay = 0,
      operations = {},
      mocks = {},
    } = options;

    const schema = makeExecutableSchema({
      typeDefs: schemaAsSDL(options.schema),
    });

    addMockFunctionsToSchema({
      schema,
      mocks: { ...commonMocks, ...mocks },
    });

    let currentDelay = delay;
    let currentOps = operations;

    cy.on('window:before:load', win => {
      const originalFetch = win.fetch;
      const fetch = (input: RequestInfo, init?: RequestInit) => {
        if (typeof input !== 'string') {
          throw new Error(
            'Currently only support fetch(url, options), saw fetch(Request)'
          );
        }
        if (input.includes(endpoint) && init && init.method === 'POST') {
          const payload: GQLRequestPayload<AllOperations> = JSON.parse(
            init.body as string
          );
          const { operationName, query, variables } = payload;
          const rootValue = getRootValue<AllOperations>(
            currentOps,
            operationName,
            variables
          );

          if (
            rootValue instanceof GraphQLError ||
            rootValue.constructor === GraphQLError ||
            rootValue.constructor.name === 'GraphQLError'
          ) {
            return Promise.resolve()
              .then(wait(currentDelay))
              .then(
                () =>
                  new Response(
                    JSON.stringify({
                      data: {},
                      errors: [rootValue],
                    })
                  )
              );
          }

          return graphql({
            schema,
            source: query,
            variableValues: variables,
            operationName,
            rootValue,
          })
            .then(wait(currentDelay))
            .then((data: any) => new Response(JSON.stringify(data)));
        }
        return originalFetch(input, init);
      };
      cy.stub(win, 'fetch', fetch).as('fetchStub');
    });

    cy.wrap({
      setOperations: (options: SetOperationsOpts<AllOperations>) => {
        currentDelay = options.delay || 0;
        currentOps = {
          ...currentOps,
          ...options.operations,
        };
      },
    }).as(getAlias(options));
  }
);

Cypress.Commands.add(
  'mockGraphqlOps',
  <AllOperations extends Record<string, any>>(
    options: SetOperationsOpts<AllOperations>
  ) => {
    cy.get(`@${getAlias(options)}`).invoke('setOperations' as any, options);
  }
);
