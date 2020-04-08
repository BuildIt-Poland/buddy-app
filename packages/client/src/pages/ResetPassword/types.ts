import { RouteComponentProps } from 'react-router-dom';

export interface ResetPasswordProps {
  history: RouteComponentProps['history'];
  match: {
    params: {
      token: string;
    };
  };
}

export interface FormData {
  password: string;
  passwordConfirm: string;
}
