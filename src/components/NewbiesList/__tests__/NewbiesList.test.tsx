import React from 'react';
import { create } from 'react-test-renderer';

import NewbiesList from '../NewbiesList';

jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('@material-ui/core/Typography', () => 'AddIcon');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('../../Avatar', () => 'Avatar');

describe('Component - PlusButton', () => {
  test('renders correctly', () => {
    const component = create(
      <NewbiesList newbies={[{ name: ' foo', photo: 'url' }]} />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
