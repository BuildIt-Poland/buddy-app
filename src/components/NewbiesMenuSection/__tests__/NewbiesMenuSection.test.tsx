import React from 'react';
import { create } from 'react-test-renderer';

import NewbiesMenuSection from '../NewbiesMenuSection';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Box', () => 'Box');
jest.mock('../../UserMenuListItem', () => 'UserMenuListItem');

describe('Component - NewbiesMenuSection', () => {
  test('renders correctly', () => {
    const component = create(
      <NewbiesMenuSection
        newbies={[{ name: ' foo', photo: 'url' }]}
        onSelect={() => null}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
