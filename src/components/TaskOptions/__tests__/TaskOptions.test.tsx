import React from 'react';
import { create } from 'react-test-renderer';
import TaskOptions from '../TaskOptions';

jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/ListItemIcon', () => 'ListItemIcon');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');
jest.mock('@material-ui/core/Menu', () => 'Menu');
jest.mock('@material-ui/core/MenuItem', () => 'MenuItem');
jest.mock('@material-ui/core/Fade', () => 'Fade');
jest.mock('@material-ui/icons/Edit', () => 'EditIcon');
jest.mock('@material-ui/icons/FileCopy', () => 'FileCopyIcon');
jest.mock('@material-ui/icons/Delete', () => 'DeleteIcon');
jest.mock('@material-ui/icons/MoreVert', () => 'MoreVertIcon');

describe('Component - TaskOptions', () => {
  test(`renders correctly`, () => {
    const component = create(<TaskOptions />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
