import React, { useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';

// TODO: move graphQL instances(queries, mutations) to a separate file
export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const NEWBIES_QUERY = gql`
  query NewbiesQuery($filter: String) {
    newbies(filter: $filter) {
      id
      name
      email
    }
  }
`;

interface Newbie {
  id: string;
  name: string;
  email: string;
}

// TODO: create login mechanism
export const AUTH_TOKEN = 'auth_token';
const CREDS = { email: 'las12041991@gmail.com', password: '12345' };
const TOKEN = localStorage.getItem(AUTH_TOKEN);

const App: any = () => {
  const [getNewbies, { loading, error, data }] = useLazyQuery(NEWBIES_QUERY);
  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login }) => localStorage.setItem(AUTH_TOKEN, login.token),
  });

  const newbies: [Newbie] = data && data.newbies;

  useEffect(() => {
    if (!TOKEN) {
      login({ variables: CREDS }).then(() =>
        getNewbies({ variables: { filter: 'test' } })
      );
    } else {
      getNewbies({ variables: { filter: 'test' } });
    }
  }, [login, getNewbies]);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div>
          {error && `Error! ${error.message}`}
          {(loading || !newbies) && 'Loading...'}
          {newbies &&
            newbies.map(({ id, name, email }) => (
              <div key={id}>{`name: ${name}, email: ${email}`}</div>
            ))}
        </div>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
