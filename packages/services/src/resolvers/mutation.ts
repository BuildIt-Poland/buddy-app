import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { MutationResolvers, Task } from "@buddy-app/schema";
import { templateTaskListQuery, taskQuery } from "../graphql";
import ERRORS from "../errors";

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
  try {
    return await context.prisma.deleteNewbie({ id: args.newbieId });
  } catch (error) {
    throw new ERRORS.NO_USER_FOUND();
  }
};

const deleteBuddy: MutationResolvers["deleteBuddy"] = async (
  parent,
  args,
  context
) => {
  try {
    return await context.prisma.deleteBuddy({ id: args.buddyId });
  } catch (error) {
    throw new ERRORS.NO_USER_FOUND();
  }
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
  await context.prisma.createNewbieTask({
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
  await context.prisma.createBuddyTask({
    ...args.input,
    newbie: {
      connect: { id: args.newbieId }
    }
  });

const addFromTemplate: MutationResolvers["addFromTemplate"] = async (
  parent,
  args,
  context,
  info
) => {
  const { template, newbieId } = args;
  const result = await context.prisma.$graphql(templateTaskListQuery, {
    template
  });

  try {
    const {
      newbie: { newbieTasks, buddyTasks }
    } = result;

    newbieTasks.forEach(
      async (input: Task) =>
        await addNewbieTask(parent, { input, newbieId }, context, info)
    );

    buddyTasks.forEach(
      async (input: Task) =>
        await addBuddyTask(parent, { input, newbieId }, context, info)
    );
  } catch (error) {
    throw new ERRORS.NO_TEMPLATE_FOUND();
  }

  return await context.prisma.newbie({ id: newbieId });
};

const deleteTask: MutationResolvers["deleteTask"] = async (
  parent,
  args,
  context
) => {
  const result = await context.prisma.$graphql(taskQuery, { id: args.taskId });

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
  addFromTemplate,
  deleteTask,
  updateTask
};

export default mustations;
