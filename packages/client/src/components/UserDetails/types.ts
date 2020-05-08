import { User } from '@buddy-app/schema';

export type UserDetailsProps = {
  details: User;
};

export interface ContactDetail {
  title: string;
  value: JSX.Element | string;
  visible: boolean;
  testId: string;
}
