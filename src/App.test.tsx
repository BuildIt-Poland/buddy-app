import React from 'react';
import ReactDOM from 'react-dom';
import { MockedProvider } from '@apollo/react-testing';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MockedProvider mocks={[]} addTypename={false}>
      <App />
    </MockedProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
