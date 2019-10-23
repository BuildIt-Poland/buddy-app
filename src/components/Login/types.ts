import { AuthPayload } from '../../../server/src/generated/schema-types';

export interface FormData {
  email: string;
  password: string;
}

export interface ErrorDialog {
  isOpen: Boolean;
  message: string;
}

export type AuthData = {
  login: AuthPayload;
};
