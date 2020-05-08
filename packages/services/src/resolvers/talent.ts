import {
  TalentResolvers,
  ResolversParentTypes,
  Context,
  ResolverFn,
  Talent
} from "@buddy-app/schema";

const buddies: ResolverFn<
  Talent["buddies"],
  ResolversParentTypes["Talent"],
  Context,
  any
> = (parent, _args, context) => context.prisma.buddies();

const buddiesCount: ResolverFn<
  Talent["buddiesCount"],
  ResolversParentTypes["Talent"],
  Context,
  any
> = async (parent, _args, context) => {
  const buddies = await context.prisma.buddies();
  return buddies.length;
};

const talentResolvers: TalentResolvers = {
  buddies,
  buddiesCount
};

export default talentResolvers;
