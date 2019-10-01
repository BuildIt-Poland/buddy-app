function newbie(parent, args, context) {
  return context.prisma.newbieTask({ id: parent.id }).newbie();
}

module.exports = {
  newbie
};
