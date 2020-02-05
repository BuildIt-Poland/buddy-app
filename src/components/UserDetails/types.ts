import { Buddy, Newbie } from 'buddy-app-schema';

export type UserDetailsProps = {
  details: Partial<Newbie> | (Partial<Buddy> & { notes?: string });
};
