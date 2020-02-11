"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema = require("./src/generated/schema.json");
__export(require("./src/schema-types"));
exports.default = graphql_1.printSchema(graphql_1.buildClientSchema(schema));
