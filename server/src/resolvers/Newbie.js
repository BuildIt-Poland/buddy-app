function buddy(parent, args, context) {
  return context.prisma.newbie({ id: parent.id }).buddy();
}

async function newbieTasks(parent, args, context) {
  return await context.prisma.newbie({ id: parent.id }).newbieTasks();
}

async function buddyTasks(parent, args, context) {
  return await context.prisma.newbie({ id: parent.id }).buddyTasks();
}

async function tasksCompletedCount(parent, args, context) {
  const newbieCompletedTasks = await context.prisma
    .newbie({ id: parent.id })
    .newbieTasks({
      where: {
        status: "COMPLETED"
      }
    });
  return newbieCompletedTasks.length;
}

async function tasksUncompletedCount(parent, args, context) {
  const newbieUncompletedTasks = await context.prisma
    .newbie({ id: parent.id })
    .newbieTasks({
      where: {
        status: "UNCOMPLETED"
      }
    });
  return newbieUncompletedTasks.length;
}

async function buddyTasksCompletedCount(parent, args, context) {
  const buddyCompletedTasks = await context.prisma
    .newbie({ id: parent.id })
    .buddyTasks({
      where: {
        status: "COMPLETED"
      }
    });
  return buddyCompletedTasks.length;
}

async function buddyTasksUncompletedCount(parent, args, context) {
  const buddyCompletedTasks = await context.prisma
    .newbie({ id: parent.id })
    .buddyTasks({
      where: {
        status: "UNCOMPLETED"
      }
    });
  return buddyCompletedTasks.length;
}

async function tasksRating(parent, args, context) {
  const tasksCompleted = await tasksCompletedCount(parent, args, context);
  const tasks = await newbieTasks(parent, args, context);
  const tasksAmount = tasks.length;

  return tasksAmount ? tasksCompleted / tasksAmount : 0;
}

async function buddyTasksRating(parent, args, context) {
  const tasksCompleted = await tasksCompletedCount(parent, args, context);
  const buddyTasksCompleted = await buddyTasksCompletedCount(
    parent,
    args,
    context
  );
  const tasks = await newbieTasks(parent, args, context);
  const tasksBuddy = await buddyTasks(parent, args, context);
  const tasksAmount = tasks.length + tasksBuddy.length;

  return tasksAmount ? (tasksCompleted + buddyTasksCompleted) / tasksAmount : 0;
}

module.exports = {
  buddy,
  newbieTasks,
  buddyTasks,
  tasksCompletedCount,
  tasksUncompletedCount,
  buddyTasksCompletedCount,
  buddyTasksUncompletedCount,
  tasksRating,
  buddyTasksRating
};
