import { Buddy, Newbie } from 'buddy-app-schema';
import {
  BuddyContactDetailsParams,
  NewbieContactDetailsParams,
} from 'components/ContactDetails/types';

export type SlideMenuProps = {
  isMenuVisible: boolean;
  onClose: () => void;
};

export type BasicDetailsParams =
  | NewbieContactDetailsParams
  | BuddyContactDetailsParams;

export type UserBasicDetails = {
  [key: string]: Partial<Newbie> | Partial<Buddy>;
};
