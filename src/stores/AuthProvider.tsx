import React, { useReducer, useEffect } from 'react';
import { Mutation, AuthPayload } from 'buddy-app-schema';
import { useMutation } from '@apollo/react-hooks';
import { auth } from 'utils';
import AuthContext, { State, defaultState } from 'contexts/AuthContext';
import { LOGIN_MUTATION } from 'graphql/login.graphql';

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

interface AuthProviderProps {
  children: React.ReactNode;
}

const authReducer = (state: State, action: Action): State => {
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

const AuthProvider = (props: AuthProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, defaultState);
  const [loginMutation] = useMutation<Mutation>(LOGIN_MUTATION);

  const login = async (email: string, password: string) => {
    dispatch({ type: ActionTypes.AUTH_INIT });

    try {
      const { data } = await loginMutation({
        variables: {
          email,
          password,
        },
      });

      if (data && data.login) {
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

  const logout = () => {
    auth.removeUser();
    dispatch({ type: ActionTypes.AUTH_LOGOUT });
  };

  useEffect(() => {
    const user = auth.getUser();
    if (user) {
      dispatch({
        type: ActionTypes.AUTH_SUCCESS,
        payload: user,
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
