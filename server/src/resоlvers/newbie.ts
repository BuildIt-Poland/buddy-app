import {
  NewbieResolvers,
  ResolversParentTypes,
  Context,
  ResolverFn,
  Newbie,
  TasksInfo,
  TaskStatus,
} from 'buddy-app-schema';

const buddy: ResolverFn<
  Newbie['buddy'],
  ResolversParentTypes['Newbie'],
  Context,
  any
> = (parent, args, context) => context.prisma.newbie({ id: parent.id }).buddy();

const newbieTasks: ResolverFn<
  Newbie['newbieTasks'],
  ResolversParentTypes['Newbie'],
  Context,
  any
> = async (parent, args, context) =>
  await context.prisma.newbie({ id: parent.id }).newbieTasks();

const buddyTasks: ResolverFn<
  Newbie['buddyTasks'],
  ResolversParentTypes['Newbie'],
  Context,
  any
> = async (parent, args, context) =>
  await context.prisma.newbie({ id: parent.id }).buddyTasks();

const newbieCompleted: ResolverFn<
  TasksInfo['newbieCompleted'],
  ResolversParentTypes['Newbie'],
  Context,
  any
> = async (parent, args, context) => {
  const newbieCompletedTasks = await context.prisma
    .newbie({ id: parent.id })
    .newbieTasks({
      where: {
        status: TaskStatus.Completed,
      },
    });
  return newbieCompletedTasks.length;
};

const newbieUncompleted: ResolverFn<
  TasksInfo['newbieUncompleted'],
  ResolversParentTypes['Newbie'],
  Context,
  any
> = async (parent, args, context) => {
  const newbieUncompletedTasks = await context.prisma
    .newbie({ id: parent.id })
    .newbieTasks({
      where: {
        status: TaskStatus.Uncompleted,
      },
    });
  return newbieUncompletedTasks.length;
};

const buddyCompleted: ResolverFn<
  TasksInfo['buddyCompleted'],
  ResolversParentTypes['Newbie'],
  Context,
  any
> = async (parent, args, context) => {
  const buddyCompletedTasks = await context.prisma
    .newbie({ id: parent.id })
    .buddyTasks({
      where: {
        status: TaskStatus.Completed,
      },
    });
  return buddyCompletedTasks.length;
};

const buddyUncompleted: ResolverFn<
  TasksInfo['buddyUncompleted'],
  ResolversParentTypes['Newbie'],
  Context,
  any
> = async (parent, args, context) => {
  const buddyCompletedTasks = await context.prisma
    .newbie({ id: parent.id })
    .buddyTasks({
      where: {
        status: TaskStatus.Uncompleted,
      },
    });
  return buddyCompletedTasks.length;
};

const newbieProgress: ResolverFn<
  TasksInfo['newbieProgress'],
  ResolversParentTypes['Newbie'],
  Context,
  any
> = async (parent, args, context) => {
  const tasksCompleted = await newbieCompleted(parent, args, context, null);
  const tasks = await newbieTasks(parent, args, context, null);
  const tasksAmount = tasks.length;

  return tasksAmount ? tasksCompleted / tasksAmount : 0;
};

const buddyProgress: ResolverFn<
  TasksInfo['buddyProgress'],
  ResolversParentTypes['Newbie'],
  Context,
  any
> = async (parent, args, context) => {
  const newbieTasksCompleted = await newbieCompleted(parent, args, context, null);
  const buddyTasksCompleted = await buddyCompleted(parent, args, context, null);
  const tasksNewbie = await newbieTasks(parent, args, context, null);
  const tasksBuddy = await buddyTasks(parent, args, context, null);
  const tasksAmount = tasksNewbie.length + tasksBuddy.length;

  return tasksAmount
    ? (newbieTasksCompleted + buddyTasksCompleted) / tasksAmount
    : 0;
};

const tasksInfo: ResolverFn<
  TasksInfo,
  ResolversParentTypes['Newbie'],
  Context,
  any
> = async (parent, args, context) => ({
  newbieProgress: await newbieProgress(parent, args, context, null),
  buddyProgress: await buddyProgress(parent, args, context, null),
  newbieCompleted: await newbieCompleted(parent, args, context, null),
  newbieUncompleted: await newbieUncompleted(parent, args, context, null),
  buddyCompleted: await buddyCompleted(parent, args, context, null),
  buddyUncompleted: await buddyUncompleted(parent, args, context, null),
});

const newbieResolvers: NewbieResolvers = {
  buddy,
  newbieTasks,
  buddyTasks,
  tasksInfo,
};

export default newbieResolvers;
