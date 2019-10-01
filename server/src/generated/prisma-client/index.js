"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "TaskStatus",
    embedded: false
  },
  {
    name: "UserRole",
    embedded: false
  },
  {
    name: "NewbieTask",
    embedded: false
  },
  {
    name: "BuddyTask",
    embedded: false
  },
  {
    name: "Buddy",
    embedded: false
  },
  {
    name: "Newbie",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/anton-lunov/Buddy-app/test`
});
exports.prisma = new exports.Prisma();
