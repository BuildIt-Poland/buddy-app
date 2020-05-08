import { RouteComponentProps } from 'react-router-dom';
import {
  QueryNewbieArgs,
  QueryBuddyArgs,
  QueryTalentArgs,
  User,
} from '@buddy-app/schema';

export type BasicDetailsParams = QueryNewbieArgs | QueryBuddyArgs | QueryTalentArgs;

export type UserBasicDetails = {
  [key: string]: User;
};

export type ContactDetailsProps = Pick<RouteComponentProps, 'history'>;
