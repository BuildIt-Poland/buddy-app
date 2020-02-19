import React from 'react';
import { create } from 'react-test-renderer';

import TabPanel from 'components/TabPanel';
jest.mock('@material-ui/core/Box', () => 'Box');

describe('Component - TabPanel', () => {
  test('renders correctly', () => {
    const component = create(<TabPanel value={1} index={1} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
