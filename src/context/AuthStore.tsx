import React, { useReducer } from 'react';
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
}

interface Action {
  type: string;
  payload?: any;
}

export interface AuthContextData extends State {
  login: (email: string, password: string) => Promise<any>;
}

const defaultState: State = {
  loading: false,
  error: {},
  data: {} as AuthPayload,
};

const defaultContext: AuthContextData = {
  ...defaultState,
  login: () => new Promise(() => null),
};

export const AuthContext = React.createContext(defaultContext);

const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.AUTH_INIT:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case ActionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: {},
        data: { ...action.payload },
      };
    case ActionTypes.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: { ...action.payload },
      };
    default:
      throw new Error();
  }
};

const AuthStore = (props: any): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, defaultState);
  const [loginMutation] = useMutation<Mutation>(LOGIN_MUTATION, {
    onCompleted: ({ login }) => {
      auth.setToken(login.token);
    },
  });

  const login = async (email: string, password: string) => {
    dispatch({ type: ActionTypes.AUTH_INIT });

    try {
      const result = await loginMutation({
        variables: {
          email,
          password,
        },
      });

      if (typeof result.data === 'object') {
        dispatch({
          type: ActionTypes.AUTH_SUCCESS,
          payload: result.data.login,
        });
      }
    } catch (error) {
      dispatch({ type: ActionTypes.AUTH_ERROR, payload: error });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthStore;
