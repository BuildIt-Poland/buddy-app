import {
  BuddyTaskResolvers,
  ResolversParentTypes,
  Context,
  ResolverFn,
  BuddyTask,
} from 'buddy-app-schema';

const newbie: ResolverFn<
  BuddyTask['newbie'],
  ResolversParentTypes['BuddyTask'],
  Context,
  any
> = (parent, _args, context) => context.prisma.buddyTask({ id: parent.id }).newbie();

const buddyTaskResolvers: BuddyTaskResolvers = {
  newbie,
};

export default buddyTaskResolvers;
