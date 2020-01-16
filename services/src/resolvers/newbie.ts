import {
  NewbieResolvers,
  ResolversParentTypes,
  Context,
  ResolverFn,
  Newbie,
  TasksInfo,
  TaskStatus,
} from 'buddy-app-schema';
import { GraphQLResolveInfo } from 'graphql';

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
  GraphQLResolveInfo
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
  GraphQLResolveInfo
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
  GraphQLResolveInfo
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
  GraphQLResolveInfo
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
  GraphQLResolveInfo
> = async (parent, args, context, info) => {
  const tasksCompleted = await newbieCompleted(parent, args, context, info);
  const tasks = await newbieTasks(parent, args, context, info);
  const tasksAmount = tasks.length;

  return tasksAmount ? tasksCompleted / tasksAmount : 0;
};

const buddyProgress: ResolverFn<
  TasksInfo['buddyProgress'],
  ResolversParentTypes['Newbie'],
  Context,
  GraphQLResolveInfo
> = async (parent, args, context, info) => {
  const newbieTasksCompleted = await newbieCompleted(parent, args, context, info);
  const buddyTasksCompleted = await buddyCompleted(parent, args, context, info);
  const tasksNewbie = await newbieTasks(parent, args, context, info);
  const tasksBuddy = await buddyTasks(parent, args, context, info);
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
> = async (parent, args, context, info) => ({
  newbieProgress: await newbieProgress(parent, args, context, info),
  buddyProgress: await buddyProgress(parent, args, context, info),
  newbieCompleted: await newbieCompleted(parent, args, context, info),
  newbieUncompleted: await newbieUncompleted(parent, args, context, info),
  buddyCompleted: await buddyCompleted(parent, args, context, info),
  buddyUncompleted: await buddyUncompleted(parent, args, context, info),
});

const newbieResolvers: NewbieResolvers = {
  buddy,
  newbieTasks,
  buddyTasks,
  tasksInfo,
};

export default newbieResolvers;
