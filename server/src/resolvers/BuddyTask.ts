import {
  BuddyTaskResolvers,
  ResolversParentTypes,
  Context,
  ResolverFn,
  BuddyTask,
} from '../generated/schema-types';

const newbie: ResolverFn<
  BuddyTask['newbie'],
  ResolversParentTypes['BuddyTask'],
  Context,
  any
> = (parent, args, context) => context.prisma.buddyTask({ id: parent.id }).newbie();

const buddyTaskResolvers: BuddyTaskResolvers = {
  newbie,
};

export default buddyTaskResolvers;
