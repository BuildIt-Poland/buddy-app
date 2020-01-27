import {
  BuddyResolvers,
  ResolversParentTypes,
  Context,
  ResolverFn,
  Buddy,
} from 'buddy-app-schema';

const newbies: ResolverFn<
  Buddy['newbies'],
  ResolversParentTypes['Buddy'],
  Context,
  any
> = (parent, _args, context) => context.prisma.buddy({ id: parent.id }).newbies();

const newbiesCount: ResolverFn<
  Buddy['newbiesCount'],
  ResolversParentTypes['Buddy'],
  Context,
  any
> = async (parent, _args, context) => {
  const newbies = await context.prisma.buddy({ id: parent.id }).newbies();
  return newbies.length;
};

const buddyResolvers: BuddyResolvers = {
  newbies,
  newbiesCount,
};

export default buddyResolvers;
