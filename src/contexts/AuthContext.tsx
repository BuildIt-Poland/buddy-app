import React, { useReducer, useEffect } from 'react';
import { Mutation, AuthPayload } from 'buddy-app-schema';
import { useQuery } from '@apollo/react-hooks';
import { auth } from 'utils';
import { LOGIN_MUTATION } from 'graphql/login.graphql';
import { GET_LOCAL_AUTH } from 'graphql/get-auth.graphql';
import { authCache } from 'utils/apollo-client/cache';
import { apolloClient } from 'utils';

enum ActionTypes {
  AUTH_INIT = 'auth/init',
  AUTH_ERROR = 'auth/error',
  AUTH_SUCCESS = 'auth/success',
  AUTH_LOGOUT = 'auth/logout',
}
interface IAction {
  type: ActionTypes;
  payload?: AuthPayload;
}

interface IAuthProviderProps {
  children: React.ReactNode;
  value?: AuthState;
}

export interface AuthState {
  loading: boolean;
  error?: any;
  data: AuthPayload;
  isAuthenticated: boolean;
}

const defaultState: AuthState = {
  loading: false,
  error: null,
  data: {} as AuthPayload,
  isAuthenticated: false,
};

const AuthContext = React.createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = React.createContext<React.Dispatch<IAction> | undefined>(
  undefined
);

const authReducer = (state: AuthState, action: IAction): AuthState => {
  switch (action.type) {
    case ActionTypes.AUTH_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...action.payload } as AuthPayload,
        isAuthenticated: true,
      };
    case ActionTypes.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
      };
    case ActionTypes.AUTH_LOGOUT:
      return {
        ...state,
        data: {} as AuthPayload,
        isAuthenticated: false,
      };
    default:
      throw new Error('Not valid action');
  }
};

const AuthProvider = ({ children, ...props }: IAuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, defaultState);
  const { data } = useQuery<authCache>(GET_LOCAL_AUTH);

  useEffect(() => {
    const user = auth.getUser();
    if (user) {
      dispatch({
        type: ActionTypes.AUTH_SUCCESS,
        payload: user,
      });
    }
  }, []);

  useEffect(() => {
    if (data && data.auth && data.auth.tokenHasExpired) {
      apolloClient.writeQuery<authCache>({
        query: GET_LOCAL_AUTH,
        data: {
          auth: { __typename: 'auth', tokenHasExpired: false },
        },
      });
      logout(dispatch);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={state} {...props}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
};

const useAuthState = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider');
  }
  return context;
};

const login = async (
  dispatch: React.Dispatch<IAction>,
  email: string,
  password: string
) => {
  dispatch({ type: ActionTypes.AUTH_INIT });
  try {
    const { data } = await apolloClient.mutate<Mutation>({
      mutation: LOGIN_MUTATION,
      variables: {
        email,
        password,
      },
    });

    if (data) {
      auth.setUser(data.login);
      dispatch({
        type: ActionTypes.AUTH_SUCCESS,
        payload: data.login,
      });
    }
  } catch (error) {
    dispatch({ type: ActionTypes.AUTH_ERROR, payload: error });
  }
};

const logout = (dispatch: React.Dispatch<IAction>) => {
  auth.removeUser();
  dispatch({ type: ActionTypes.AUTH_LOGOUT });
};

const useAuth = (): [AuthState, React.Dispatch<IAction>] => {
  return [useAuthState(), useAuthDispatch()];
};

export { AuthProvider, useAuth, login, logout };
