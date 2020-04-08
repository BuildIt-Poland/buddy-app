import { UserResolvers, UserRole } from "@buddy-app/schema";

const __resolveType: UserResolvers["__resolveType"] = ({ role }) => {
  switch (role) {
    case UserRole.Buddy:
      return "Buddy";

    case UserRole.Newbie:
      return "Newbie";

    default:
      return null;
  }
};

const userResolvers: UserResolvers = {
  __resolveType
};

export default userResolvers;
