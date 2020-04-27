import { Newbie, Buddy, Talent } from '@buddy-app/schema';

export type UserMenuDetailsProps = {
  user: Partial<Newbie | Buddy | Talent>;
  onClick?: () => void;
};
