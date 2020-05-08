import {
  Newbie,
  Buddy,
  Talent,
  QueryNewbieArgs,
  QueryBuddyArgs,
  QueryTalentArgs,
} from '@buddy-app/schema';

export type UserMenuProps = {
  onCloseClick?: Function;
};

export type ToRoute = (route: string) => void;

export type User = Newbie & Buddy & Talent;

export type BasicDetailsParams = QueryNewbieArgs | QueryBuddyArgs | QueryTalentArgs;

export type UserBasicDetails = {
  [key: string]: User;
};
