import React, { useReducer, useEffect } from 'react';
import { AuthPayload, Mutation } from 'types';
import { useMutation } from '@apollo/react-hooks';
import { auth } from 'utils';
import LOGIN_MUTATION from 'graphql/login.graphql';

enum ActionTypes {
  AUTH_INIT = 'auth/init',
  AUTH_ERROR = 'auth/error',
  AUTH_SUCCESS = 'auth/success',
  AUTH_LOGOUT = 'auth/logout',
}

interface State {
  loading: boolean;
  error: any;
  data: AuthPayload;
  isAuthenticated: boolean;
}

interface Action {
  type: string;
  payload?: any;
}

export interface AuthContextData extends State {
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

const defaultState: State = {
  loading: false,
  error: null,
  data: {} as AuthPayload,
  isAuthenticated: false,
};

const defaultContext: AuthContextData = {
  ...defaultState,
  login: () => new Promise(() => null),
  logout: () => null,
};

export const AuthContext = React.createContext(defaultContext);

const authReducer = (state: State, action: Action) => {
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
        data: { ...action.payload },
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
        data: {},
        isAuthenticated: false,
      };
    default:
      throw new Error();
  }
};

const AuthStore = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, defaultState);
  const [loginMutation] = useMutation<Mutation>(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      auth.setUser(login);
    },
  });

  const login = async (email: string, password: string) => {
    dispatch({ type: ActionTypes.AUTH_INIT });

    try {
      const { data } = await loginMutation({
        variables: {
          email,
          password,
        },
      });

      if (typeof data === 'object') {
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
    dispatch({ type: ActionTypes.AUTH_LOGOUT });
    auth.removeUser();
  };

  useEffect(() => {
    const user = auth.getUser();
    if (user && user.token) {
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

export default AuthStore;
