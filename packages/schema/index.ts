import { buildClientSchema, printSchema } from 'graphql';
import * as schema from './src/generated/schema.json';

interface Schema {
  __schema: any;
}

export * from './src/schema-types';
export default printSchema(buildClientSchema(schema as Schema));
