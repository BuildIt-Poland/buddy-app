import { QueryResolvers } from "@buddy-app/schema";

const newbie: QueryResolvers["newbie"] = async (parent, args, context) =>
  await context.prisma.newbie({ id: args.newbieId });

const buddy: QueryResolvers["buddy"] = async (parent, args, context) =>
  await context.prisma.buddy({ id: args.buddyId });

const talent: QueryResolvers["talent"] = async (parent, args, context) =>
  await context.prisma.talent({ id: args.talentId });

const task: QueryResolvers["task"] = async (parent, args, context) => {
  const buddyTask = await context.prisma.buddyTask({ id: args.taskId });
  const newbieTask = await context.prisma.newbieTask({ id: args.taskId });
  return buddyTask || newbieTask;
};

const newbies: QueryResolvers["newbies"] = async (parent, args, context) => {
  const OR = [
    { email_contains: args.filter },
    { name_contains: args.filter },
    { position_contains: args.filter },
    { phoneNumber_contains: args.filter }
  ];
  const where = args.filter ? { OR } : {};

  const newbies = await context.prisma.newbies({
    where,
    first: args.first
  });

  return newbies;
};

const newbieTasks: QueryResolvers["newbieTasks"] = async (
  parent,
  args,
  context
) =>
  await context.prisma.newbieTasks({
    where: {
      OR: [{ title_contains: args.title }, { status: args.status }]
    },
    first: args.first
  });

const buddyTasks: QueryResolvers["buddyTasks"] = async (
  parent,
  args,
  context
) =>
  await context.prisma.buddyTasks({
    where: {
      OR: [{ title_contains: args.title }, { status: args.status }]
    },
    first: args.first
  });

const queries: QueryResolvers = {
  newbie,
  buddy,
  talent,
  task,
  newbies,
  newbieTasks,
  buddyTasks
};

export default queries;
