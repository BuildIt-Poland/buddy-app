import React from 'react';
import { create } from 'react-test-renderer';
import { SearchProvider } from 'contexts/SearchContext';
import SearchBar from '../SearchBar';

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
