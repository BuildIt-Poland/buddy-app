function newbies(parent, args, context) {
  return context.prisma.buddy({ id: parent.id }).newbies()
}

async function newbiesCount(parent, args, context) {
  const newbies = await context.prisma.buddy({ id: parent.id }).newbies()
  return newbies.length
}

module.exports = {
  newbies,
  newbiesCount,
}
