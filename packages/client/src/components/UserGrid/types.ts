import { Maybe, Newbie, Buddy } from '@buddy-app/schema';

export type User = Newbie | Buddy;

export type UserDetails = {
  to: string;
  progress?: number;
};

export interface UserGridProps {
  users: Maybe<User>[];
}
