import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { MutationResolvers } from '../generated/schema-types';
import { changeTaskStatus, ERRORS } from '../utils';

const addBuddy: MutationResolvers['addBuddy'] = async (parent, args, context) => {
  const password = await bcrypt.hash(args.input.password, 10);

  const userExist = await context.prisma.$exists.buddy({
    email: args.input.email,
  });
  if (userExist) {
    throw new Error(ERRORS.EXIST);
  }

  const buddy = await context.prisma.createBuddy({ ...args.input, password });

  return buddy;
};

const addNewbie: MutationResolvers['addNewbie'] = async (parent, args, context) => {
  const password = await bcrypt.hash(args.input.password, 10);

  const userExist = await context.prisma.$exists.newbie({
    email: args.input.email,
  });
  if (userExist) {
    throw new Error(ERRORS.EXIST);
  }

  const newbie = await context.prisma.createNewbie({
    ...args.input,
    password,
    buddy: {
      connect: { id: args.buddyId },
    },
  });

  return newbie;
};

const deleteNewbie: MutationResolvers['deleteNewbie'] = async (
  parent,
  args,
  context
) => await context.prisma.deleteNewbie({ id: args.newbieId });

const deleteBuddy: MutationResolvers['deleteBuddy'] = async (
  parent,
  args,
  context
) => await context.prisma.deleteBuddy({ id: args.buddyId });

const login: MutationResolvers['login'] = async (parent, args, context) => {
  const buddy = await context.prisma.buddy({ email: args.email });
  const newbie = await context.prisma.newbie({ email: args.email });

  const user = buddy || newbie;

  if (!user) {
    throw new Error(ERRORS.USER_RESULT);
  }

  if (args.password !== user.password) {
    throw new Error(ERRORS.PASSWORD);
  }

  return {
    token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
    role: user.role,
    userId: user.id,
  };
};

const addNewbieTask: MutationResolvers['addNewbieTask'] = async (
  parent,
  args,
  context
) =>
  context.prisma.createNewbieTask({
    ...args.input,
    newbie: {
      connect: { id: args.newbieId },
    },
  });

const addBuddyTask: MutationResolvers['addBuddyTask'] = async (
  parent,
  args,
  context
) =>
  context.prisma.createBuddyTask({
    ...args.input,
    newbie: {
      connect: { id: args.newbieId },
    },
  });

const deleteTask: MutationResolvers['deleteTask'] = async (
  parent,
  args,
  context
) => {
  try {
    const buddyTask = await context.prisma.deleteBuddyTask({
      id: args.taskId,
    });

    return buddyTask;
  } catch (error) {}

  try {
    const newbieTask = await context.prisma.deleteNewbieTask({
      id: args.taskId,
    });

    return newbieTask;
  } catch (error) {}

  throw new Error(ERRORS.TASK_RESULT);
};

const updateTask: MutationResolvers['updateTask'] = async (
  parent,
  args,
  context
) => {
  try {
    const updatedBuddyTask = await context.prisma.updateBuddyTask({
      data: {
        ...args.input,
      },
      where: {
        id: args.taskId,
      },
    });

    return updatedBuddyTask;
  } catch (error) {}

  try {
    const updatedNewbieTask = await context.prisma.updateNewbieTask({
      data: {
        ...args.input,
      },
      where: {
        id: args.taskId,
      },
    });
    return updatedNewbieTask;
  } catch (error) {}

  throw new Error(ERRORS.TASK_RESULT);
};

const updateTaskStatus: MutationResolvers['updateTaskStatus'] = async (
  parent,
  args,
  context
) => {
  const buddyTask = await context.prisma.buddyTask({ id: args.taskId });
  const newbieTask = await context.prisma.newbieTask({
    id: args.taskId,
  });

  const task = buddyTask || newbieTask;

  try {
    const updatedBuddyTask = await context.prisma.updateBuddyTask({
      data: {
        status: changeTaskStatus(task.status),
      },
      where: {
        id: args.taskId,
      },
    });

    return updatedBuddyTask;
  } catch (error) {}

  try {
    const updatedNewbieTask = await context.prisma.updateNewbieTask({
      data: {
        status: changeTaskStatus(task.status),
      },
      where: {
        id: args.taskId,
      },
    });
    return updatedNewbieTask;
  } catch (error) {}

  throw new Error(ERRORS.TASK_RESULT);
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
  updateTaskStatus,
};

export default mustations;
