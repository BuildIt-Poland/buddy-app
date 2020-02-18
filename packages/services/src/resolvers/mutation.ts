<<<<<<< HEAD:packages/services/src/resolvers/mutation.ts
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { MutationResolvers } from "@buddy-app/schema";
import { changeTaskStatus } from "../utils";
import ERRORS from "../errors";
=======
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { MutationResolvers } from 'buddy-app-schema';
import ERRORS from '../errors';
>>>>>>> master:services/src/resolvers/mutation.ts

const addBuddy: MutationResolvers["addBuddy"] = async (
  parent,
  args,
  context
) => {
  const password = await bcrypt.hash(args.input.password, 10);

  const userExist = await context.prisma.$exists.buddy({
    email: args.input.email
  });
  if (userExist) {
    throw new ERRORS.ACCOUNT_EXIST();
  }

  const buddy = await context.prisma.createBuddy({ ...args.input, password });

  return buddy;
};

const addNewbie: MutationResolvers["addNewbie"] = async (
  parent,
  args,
  context
) => {
  const password = await bcrypt.hash(args.input.password, 10);

  const userExist = await context.prisma.$exists.newbie({
    email: args.input.email
  });
  if (userExist) {
    throw new ERRORS.ACCOUNT_EXIST();
  }

  const newbie = await context.prisma.createNewbie({
    ...args.input,
    password,
    buddy: {
      connect: { id: args.buddyId }
    }
  });

  return newbie;
};

const deleteNewbie: MutationResolvers["deleteNewbie"] = async (
  parent,
  args,
  context
) => {
  const newbie = await context.prisma.newbie({ id: args.newbieId });
  if (!newbie) {
    throw new ERRORS.NO_USER_FOUND();
  }
  return await context.prisma.deleteNewbie({ id: args.newbieId });
};

const deleteBuddy: MutationResolvers["deleteBuddy"] = async (
  parent,
  args,
  context
) => {
  const buddy = await context.prisma.buddy({ id: args.buddyId });
  if (!buddy) {
    throw new ERRORS.NO_USER_FOUND();
  }
  return await context.prisma.deleteBuddy({ id: args.buddyId });
};

const login: MutationResolvers["login"] = async (parent, args, context) => {
  const buddy = await context.prisma.buddy({ email: args.email });
  const newbie = await context.prisma.newbie({ email: args.email });

  const user = buddy || newbie;

  if (!user) {
    throw new ERRORS.NO_USER_FOUND();
  }

  if (args.password !== user.password) {
    throw new ERRORS.INVALID_PASSWORD();
  }

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET as string),
    role: user.role,
    userId: user.id
  };
};

const addNewbieTask: MutationResolvers["addNewbieTask"] = async (
  parent,
  args,
  context
) =>
  context.prisma.createNewbieTask({
    ...args.input,
    newbie: {
      connect: { id: args.newbieId }
    }
  });

const addBuddyTask: MutationResolvers["addBuddyTask"] = async (
  parent,
  args,
  context
) =>
  context.prisma.createBuddyTask({
    ...args.input,
    newbie: {
      connect: { id: args.newbieId }
    }
  });

const deleteTask: MutationResolvers["deleteTask"] = async (
  parent,
  args,
  context
) => {
  const query = `
    query ($id: ID!){
      buddyTask(where: {
        id: $id
      }) {
        newbie {
          id
        }
      }
      newbieTask(where: {
        id: $id
      }) {
        newbie {
          id
        }
      }
    }
  `;
  const variables = { id: args.taskId };
  const result = await context.prisma.$graphql(query, variables);

  try {
    await context.prisma.deleteBuddyTask({
      id: args.taskId
    });

    return result.buddyTask.newbie;
  } catch (error) {}

  try {
    await context.prisma.deleteNewbieTask({
      id: args.taskId
    });

    return result.newbieTask.newbie;
  } catch (error) {}

  throw new ERRORS.NO_TASK_FOUND();
};

const updateTask: MutationResolvers["updateTask"] = async (
  parent,
  args,
  context
) => {
  try {
    const updatedBuddyTask = await context.prisma.updateBuddyTask({
      data: {
        ...args.input
      },
      where: {
        id: args.taskId
      }
    });

    return updatedBuddyTask;
  } catch (error) {}

  try {
    const updatedNewbieTask = await context.prisma.updateNewbieTask({
      data: {
        ...args.input
      },
      where: {
        id: args.taskId
      }
    });
    return updatedNewbieTask;
  } catch (error) {}

  throw new ERRORS.NO_TASK_FOUND();
};

const mustations: MutationResolvers = {
  addBuddy,
  addNewbie,
  deleteNewbie,
  deleteBuddy,
  login,
  addNewbieTask,
  addBuddyTask,
  deleteTask,
  updateTask,
};

export default mustations;
