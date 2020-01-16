import {
  NewbieTaskResolvers,
  ResolversParentTypes,
  Context,
  ResolverFn,
  NewbieTask,
} from 'buddy-app-schema';

const newbie: ResolverFn<
  NewbieTask['newbie'],
  ResolversParentTypes['NewbieTask'],
  Context,
  any
> = (parent, _args, context) =>
  context.prisma.newbieTask({ id: parent.id }).newbie();

const newbieTaskResolvers: NewbieTaskResolvers = {
  newbie,
};

export default newbieTaskResolvers;
