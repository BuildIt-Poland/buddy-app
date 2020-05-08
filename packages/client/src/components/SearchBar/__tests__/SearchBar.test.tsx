import React from 'react';
import { create } from 'react-test-renderer';
import { SearchProvider } from 'contexts/SearchContext';
import SearchBar from '../SearchBar';

jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/InputBase', () => 'InputBase');
jest.mock('@material-ui/icons/HighlightOffOutlined', () => 'HighlightOffOutlined');
jest.mock('@material-ui/icons/Search', () => 'Search');

describe('Component - SearchBar', () => {
  test('renders correctly', () => {
    const component = create(
      <SearchProvider>
        <SearchBar />
      </SearchProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
