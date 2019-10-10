import {
  BuddyResolvers,
  ResolversParentTypes,
  Context,
  ResolverFn,
  Buddy,
} from '../generated/schema-types';

const newbies: ResolverFn<
  Buddy['newbies'],
  ResolversParentTypes['Buddy'],
  Context,
  any
> = (parent, args, context) => context.prisma.buddy({ id: parent.id }).newbies();

const newbiesCount: ResolverFn<
  Buddy['newbiesCount'],
  ResolversParentTypes['Buddy'],
  Context,
  any
> = async (parent, args, context) => {
  const newbies = await context.prisma.buddy({ id: parent.id }).newbies();
  return newbies.length;
};

const buddyResolvers: BuddyResolvers = {
  newbies,
  newbiesCount,
};

export default buddyResolvers;
