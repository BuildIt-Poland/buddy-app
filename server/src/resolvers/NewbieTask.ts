import {
  NewbieTaskResolvers,
  ResolversParentTypes,
  Context,
  ResolverFn,
  NewbieTask,
} from '../generated/schema-types';

const newbie: ResolverFn<
  NewbieTask['newbie'],
  ResolversParentTypes['NewbieTask'],
  Context,
  any
> = (parent, args, context) => context.prisma.newbieTask({ id: parent.id }).newbie();

const newbieTaskResolvers: NewbieTaskResolvers = {
  newbie,
};

export default newbieTaskResolvers;
