function buddy(parent, args, context) {
  return context.prisma.newbie({ id: parent.id }).buddy();
}

async function newbieTasks(parent, args, context) {
  return await context.prisma.newbie({ id: parent.id }).newbieTasks();
}

async function buddyTasks(parent, args, context) {
  return await context.prisma.newbie({ id: parent.id }).buddyTasks();
}

async function newbieCompleted(parent, args, context) {
  const newbieCompletedTasks = await context.prisma
    .newbie({ id: parent.id })
    .newbieTasks({
      where: {
        status: 'COMPLETED',
      },
    });
  return newbieCompletedTasks.length;
}

async function newbieUncompleted(parent, args, context) {
  const newbieUncompletedTasks = await context.prisma
    .newbie({ id: parent.id })
    .newbieTasks({
      where: {
        status: 'UNCOMPLETED',
      },
    });
  return newbieUncompletedTasks.length;
}

async function buddyCompleted(parent, args, context) {
  const buddyCompletedTasks = await context.prisma
    .newbie({ id: parent.id })
    .buddyTasks({
      where: {
        status: 'COMPLETED',
      },
    });
  return buddyCompletedTasks.length;
}

async function buddyUncompleted(parent, args, context) {
  const buddyCompletedTasks = await context.prisma
    .newbie({ id: parent.id })
    .buddyTasks({
      where: {
        status: 'UNCOMPLETED',
      },
    });
  return buddyCompletedTasks.length;
}

async function newbieProgress(parent, args, context) {
  const tasksCompleted = await newbieCompleted(parent, args, context);
  const tasks = await newbieTasks(parent, args, context);
  const tasksAmount = tasks.length;

  return tasksAmount ? tasksCompleted / tasksAmount : 0;
}

async function buddyProgress(parent, args, context) {
  const newbieTasksCompleted = await newbieCompleted(parent, args, context);
  const buddyTasksCompleted = await buddyCompleted(parent, args, context);
  const tasksNewbie = await newbieTasks(parent, args, context);
  const tasksBuddy = await buddyTasks(parent, args, context);
  const tasksAmount = tasksNewbie.length + tasksBuddy.length;

  return tasksAmount
    ? (newbieTasksCompleted + buddyTasksCompleted) / tasksAmount
    : 0;
}

async function tasksInfo(parent, args, context) {
  const result = {
    newbieProgress: await newbieProgress(parent, args, context),
    buddyProgress: await buddyProgress(parent, args, context),
    newbieCompleted: await newbieCompleted(parent, args, context),
    newbieUncompleted: await newbieUncompleted(parent, args, context),
    buddyCompleted: await buddyCompleted(parent, args, context),
    buddyUncompleted: await buddyUncompleted(parent, args, context),
  };

  return result;
}

module.exports = {
  buddy,
  newbieTasks,
  buddyTasks,
  tasksInfo,
};
