import {
  Buddy,
  MutationDeleteBuddyArgs,
  MutationDeleteNewbieArgs,
  Newbie,
} from 'buddy-app-schema';

export type UserMenuProps = {
  onCloseClick?: () => void;
};

export type BasicDetailsParams = MutationDeleteNewbieArgs | MutationDeleteBuddyArgs;

export type UserBasicDetails = {
  [key: string]: Partial<Newbie> | Partial<Buddy>;
};
