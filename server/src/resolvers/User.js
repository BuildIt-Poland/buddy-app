function __resolveType(user, context, info) {
  const newbieUniqueProps = [
    "buddy",
    "notes",
    "tasksRating",
    "buddyTasksRating",
    "tasksCompletedCount",
    "tasksUncompletedCount",
    "buddyTasksCompletedCount",
    "buddyTasksUncompletedCount",
    "newbieTasks",
    "buddyTasks"
  ];
  const buddyUniqueProps = ["newbiesCount", "newbies"];

  if (buddyUniqueProps.some(prop => user.hasOwnProperty(prop))) {
    return "Buddy";
  }

  if (newbieUniqueProps.some(prop => user.hasOwnProperty(prop))) {
    return "Newbie";
  }

  return null;
}

module.exports = {
  __resolveType
};
