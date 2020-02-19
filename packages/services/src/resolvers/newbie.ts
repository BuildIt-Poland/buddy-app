import {
  NewbieResolvers,
  ResolversParentTypes,
  Context,
  ResolverFn,
  Newbie
} from "@buddy-app/schema";

const buddy: ResolverFn<
  Newbie["buddy"],
  ResolversParentTypes["Newbie"],
  Context,
  any
> = (parent, args, context) => context.prisma.newbie({ id: parent.id }).buddy();

const newbieTasks: ResolverFn<
  Newbie["newbieTasks"],
  ResolversParentTypes["Newbie"],
  Context,
  any
> = async (parent, args, context) =>
  await context.prisma.newbie({ id: parent.id }).newbieTasks();

const buddyTasks: ResolverFn<
  Newbie["buddyTasks"],
  ResolversParentTypes["Newbie"],
  Context,
  any
> = async (parent, args, context) =>
  await context.prisma.newbie({ id: parent.id }).buddyTasks();

const newbieResolvers: NewbieResolvers = {
  buddy,
  newbieTasks,
  buddyTasks
};

export default newbieResolvers;
