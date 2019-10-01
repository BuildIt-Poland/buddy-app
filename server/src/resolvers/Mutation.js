const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, STATUS, isBuddyAuth } = require("../utils");

async function addBuddy(parent, args, context) {
  await isBuddyAuth(context)
  const password = await bcrypt.hash(args.input.password, 10);

  const userExist = await context.prisma.$exists.buddy({
    email: args.input.email
  });
  if (userExist) {
    throw new Error(`Account already exist`);
  }

  const buddy = await context.prisma.createBuddy({ ...args.input, password });

  return buddy;
}

async function addNewbie(parent, args, context) {
  await isBuddyAuth(context)

  const password = await bcrypt.hash(args.input.password, 10);

  const userExist = await context.prisma.$exists.newbie({
    email: args.input.email
  });
  if (userExist) {
    throw new Error(`Account already exist`);
  }

  const newbie = await context.prisma.createNewbie({
    ...args.input,
    password,
    buddy: {
      connect: { id: args.buddyId }
    }
  });

  return newbie;
}

async function deleteNewbie(parent, args, context) {
  await isBuddyAuth(context)

  return await context.prisma.deleteNewbie({ id: args.newbieId });
}

async function deleteBuddy(parent, args, context) {
  await isBuddyAuth(context)

  return await context.prisma.deleteBuddy({ id: args.buddyId });
}

async function login(parent, args, context) {
  const buddy = await context.prisma.buddy({ email: args.email });
  const newbie = await context.prisma.newbie({ email: args.email });

  const user = buddy || newbie;

  if (!user) {
    throw new Error("No such user found");
  }

  if (args.password !== user.password) {
    throw new Error("Invalid password");
  }

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    role: user.role,
    userId: user.id
  };
}

async function addNewbieTask(parent, args, context) {
  await isBuddyAuth(context)

  return context.prisma.createNewbieTask({
    ...args.input,
    newbie: {
      connect: { id: args.newbieId }
    }
  });
}

async function addBuddyTask(parent, args, context) {
  await isBuddyAuth(context)

  return context.prisma.createBuddyTask({
    ...args.input,
    newbie: {
      connect: { id: args.newbieId }
    }
  });
}

async function deleteTask(parent, args, context) {
  await isBuddyAuth(context)

  try {
    const buddyTask = await context.prisma.deleteBuddyTask({
      id: args.taskId
    });

    return buddyTask;
  } catch (error) {}

  try {
    const newbieTask = await context.prisma.deleteNewbieTask({
      id: args.taskId
    });

    return newbieTask;
  } catch (error) {}

  throw new Error("No such task found");
}

async function updateTask(parent, args, context) {
  await isBuddyAuth(context)

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

  throw new Error("No such task found");
}

async function updateTaskStatus(parent, args, context) {
  await isBuddyAuth(context)

  const buddyTask = await context.prisma.buddyTask({ id: args.taskId });
  const newbieTask = await context.prisma.newbieTask({
    id: args.taskId
  });

  const task = buddyTask || newbieTask;

  try {
    const updatedBuddyTask = await context.prisma.updateBuddyTask({
      data: {
        status:
          task.status === STATUS.COMPLETED ? STATUS.UNCOMPLETED : STATUS.COMPLETED
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
        status:
          task.status === STATUS.COMPLETED ? STATUS.UNCOMPLETED : STATUS.COMPLETED
      },
      where: {
        id: args.taskId
      }
    });
    return updatedNewbieTask;
  } catch (error) {}

  throw new Error("No such task found");
}

module.exports = {
  addBuddy,
  addNewbie,
  deleteNewbie,
  deleteBuddy,
  login,
  addNewbieTask,
  addBuddyTask,
  deleteTask,
  updateTask,
  updateTaskStatus
};
