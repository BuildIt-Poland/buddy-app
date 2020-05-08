import { RouteComponentProps } from 'react-router-dom';

export interface FormData {
  email: string;
}

export type ForgotPasswordProps = Pick<RouteComponentProps, 'history'>;
