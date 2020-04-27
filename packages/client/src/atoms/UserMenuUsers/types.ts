import { Maybe, Newbie, Buddy } from '@buddy-app/schema';

export type UserMenuUsersProps = {
  title: string;
  users: Maybe<Newbie | Buddy>[];
  onSelect: (id: string) => void;
};
