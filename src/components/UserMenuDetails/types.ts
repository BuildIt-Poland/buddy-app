import { Buddy, Newbie } from 'buddy-app-schema';

export type UserMenuDetailsProps = {
  user: Partial<Newbie> | Partial<Buddy>;
};
