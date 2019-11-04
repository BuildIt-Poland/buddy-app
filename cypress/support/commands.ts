import { graphql } from 'graphql';
import { buildClientSchema, printSchema } from 'graphql';
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  IMocks,
} from 'graphql-tools';
import introspectionSchema from '../../server/src/schema.graphql';
import commonMocks from '../fixtures/graphql-mocks';

interface MockGraphQLOptions<AllOperations extends Record<string, any>> {
  schema: object | string | string[];
  name?: string;
  mocks?: IMocks;
  endpoint?: string;
  operations?: Partial<AllOperations>;
}

interface SetOperationsOpts<AllOperations> {
  name?: string;
  endpoint?: string;
  operations?: Partial<AllOperations>;
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
    }
  }
}

const dataTest = (value: string): Cypress.Chainable<JQuery> => {
  return cy.get(`[data-testid=${value}]`);
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

Cypress.Commands.add('dataTest', dataTest);

Cypress.Commands.add(
  'mockGraphql',
  <AllOperations extends Record<string, any>>(
    options: MockGraphQLOptions<AllOperations>
  ) => {
    const { endpoint = '/graphql', operations = {}, mocks = {} } = options;

    const schema = makeExecutableSchema({
      typeDefs: schemaAsSDL(options.schema),
    });

    addMockFunctionsToSchema({
      schema,
      mocks: { ...commonMocks, ...mocks },
    });

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
          return graphql({
            schema,
            source: query,
            variableValues: variables,
            operationName,
            rootValue: getRootValue<AllOperations>(
              currentOps,
              operationName,
              variables
            ),
          }).then((data: any) => new Response(JSON.stringify(data)));
        }
        return originalFetch(input, init);
      };
      cy.stub(win, 'fetch', fetch).as('fetchStub');
    });

    cy.wrap({
      setOperations: (newOperations: Partial<AllOperations>) => {
        currentOps = {
          ...(operations as object),
          ...(newOperations as object),
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
    cy.get(`@${getAlias(options)}`).invoke(
      'setOperations' as any,
      options.operations || {}
    );
  }
);
