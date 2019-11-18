import { RouteComponentProps } from 'react-router-dom';
import { Buddy, Newbie } from 'buddy-app-schema';

export type NewbieContactDetailsParams = {
  newbieId: string;
};

export type BuddyContactDetailsParams = {
  buddyId: string;
};

export type NewbieData = {
  newbie: Partial<Newbie>;
};

export type BuddyData = {
  buddy: Partial<Buddy>;
};

export type ContactDetailsProps = Pick<RouteComponentProps, 'history'>;
