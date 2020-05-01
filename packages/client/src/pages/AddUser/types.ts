import { RouteComponentProps } from 'react-router-dom';
import { UserInput } from '@buddy-app/schema';

export interface State {
  file: any;
}

export interface FormData extends UserInput {
  email: string;
  name: string;
}

export type AddUserProps = Pick<RouteComponentProps, 'history'>;
