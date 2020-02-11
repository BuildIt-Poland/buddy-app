import { UserResolvers } from "@buddy-app/schema";

const __resolveType: UserResolvers["__resolveType"] = user => {
  const newbieUniqueProps = ["buddy", "notes", "newbieTasks", "buddyTasks"];
  const buddyUniqueProps = ["newbiesCount", "newbies"];

  if (buddyUniqueProps.some(prop => user.hasOwnProperty(prop))) {
    return "Buddy";
  }

  if (newbieUniqueProps.some(prop => user.hasOwnProperty(prop))) {
    return "Newbie";
  }

  return null;
};

const userResolvers: UserResolvers = {
  __resolveType
};

export default userResolvers;
