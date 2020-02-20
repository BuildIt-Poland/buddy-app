import { Buddy, Newbie } from '@buddy-app/schema';

export type UserDetailsProps = {
  details: Partial<Newbie> | (Partial<Buddy> & { notes?: string });
};

export interface ContactDetail {
  title: string;
  value: JSX.Element | string;
  visible: boolean;
  testId: string;
}
