function __resolveType(user, context, info) {
  const newbieUniqueProps = ['notes'];

  if (newbieUniqueProps.some(prop => user.hasOwnProperty(prop))) {
    return "NewbieTask";
  }

  return "BuddyTask";
}

module.exports = {
  __resolveType
};
