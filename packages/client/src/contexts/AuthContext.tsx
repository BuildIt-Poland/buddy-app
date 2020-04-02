import React, { useReducer, useEffect, useContext } from 'react';
import { Mutation, AuthPayload } from '@buddy-app/schema';
import { useQuery } from '@apollo/react-hooks';
import { ExecutionResult } from '@apollo/react-common';
import { auth } from 'utils';
import { LOGIN_MUTATION } from 'graphql/login.graphql';
import { GET_LOCAL_AUTH } from 'graphql/get-auth.graphql';
import { AuthCache, setCacheToken } from 'utils/apollo-client/cache';
import { apolloClient } from 'utils';

enum ActionTypes {
  AUTH_INIT = 'auth/init',
  AUTH_ERROR = 'auth/error',
  AUTH_SUCCESS = 'auth/success',
  AUTH_LOGOUT = 'auth/logout',
}

interface Action {
  type: ActionTypes;
  payload?: AuthPayload;
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

interface AuthContext extends AuthState {
  login: (email: string, password: string) => Promise<ExecutionResult<Mutation>>;
  logout: () => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
  value?: AuthContext;
}

const defaultContext: AuthContext = {
  ...defaultState,
  login: () => Promise.reject(),
  logout: () => null,
};

const AuthContext = React.createContext(defaultContext);

const authReducer = (state: AuthState, action: Action): AuthState => {
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

const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, defaultState);
  const { data } = useQuery<AuthCache>(GET_LOCAL_AUTH);

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
      logout();
    }
  }, [data]);

  const login = async (email: string, password: string) => {
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

      return Promise.resolve({ data });
    } catch (error) {
      dispatch({ type: ActionTypes.AUTH_ERROR, payload: error });
      return Promise.reject(error);
    }
  };

  const logout = () => {
    auth.removeUser();
    apolloClient.writeData({
      data: {
        ...setCacheToken(false),
      },
    });
    dispatch({ type: ActionTypes.AUTH_LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }} {...props}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
};

export { AuthProvider, useAuth };
