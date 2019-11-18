import Maybe from 'graphql/tsutils/Maybe';
import { Buddy, Newbie, User } from 'buddy-app-schema';

export type UserMenuListItemProps = {
  user: Maybe<Newbie> | Maybe<Buddy>;
  onItemClick: (id: string) => void;
};
