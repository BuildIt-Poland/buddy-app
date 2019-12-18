import React from 'react';
import { AuthPayload } from 'buddy-app-schema';

export interface State {
  loading: boolean;
  error: any;
  data: AuthPayload;
  isAuthenticated: boolean;
  isAppBootstrapped: boolean;
}

export interface AuthContextData extends State {
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const defaultState: State = {
  loading: false,
  error: null,
  data: {} as AuthPayload,
  isAuthenticated: false,
  isAppBootstrapped: false,
};

const defaultContext: AuthContextData = {
  ...defaultState,
  login: () => null,
  logout: () => null,
};

const AuthContext = React.createContext<AuthContextData>(defaultContext);

export default AuthContext;
