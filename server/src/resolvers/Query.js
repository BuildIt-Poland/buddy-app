const { auth } = require("../utils");

async function newbie(parent, args, context) {
  auth(context);

  return await context.prisma.newbie({ id: args.newbieId });
}

async function buddy(parent, args, context) {
  auth(context);

  return await context.prisma.buddy({ id: args.buddyId });
}

async function task(parent, args, context) {
  auth(context);

  const buddyTask = await context.prisma.buddyTask({ id: args.taskId });
  const newbieTask = await context.prisma.newbieTask({ id: args.taskId });
  return buddyTask || newbieTask;
}

async function newbies(parent, args, context) {
  auth(context);

  const where = args.filter
    ? {
        OR: [
          { email_contains: args.filter },
          { name_contains: args.filter },
          { position_contains: args.filter },
          { phoneNumber_contains: args.filter }
        ]
      }
    : {};

  const newbies = await context.prisma.newbies({
    where,
    first: args.first
  });

  return newbies;
}

async function newbieTasks(parent, args, context) {
  auth(context);

  return await context.prisma.newbieTasks({
    where: {
      OR: [{ title_contains: args.title }, { status: args.status }]
    },
    first: args.first
  });
}

async function buddyTasks(parent, args, context) {
  auth(context);

  return await context.prisma.buddyTasks({
    where: {
      OR: [{ title_contains: args.title }, { status: args.status }]
    },
    first: args.first
  });
}

module.exports = {
  newbie,
  buddy,
  task,
  newbies,
  newbieTasks,
  buddyTasks
};
