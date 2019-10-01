function newbie(parent, args, context) {
  return context.prisma.buddyTask({ id: parent.id }).newbie()
}

module.exports = {
  newbie,
}
