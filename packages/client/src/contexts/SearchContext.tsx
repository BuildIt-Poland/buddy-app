import React, { useState, useContext, createContext } from 'react';

interface SearchState {
  searchValue: string;
}

interface SearchStateContextData extends SearchState {
  addSearchValue: (searchValue: string) => void;
  deleteSearchValue: () => void;
}

const defaultState: SearchState = {
  searchValue: '',
};

const SearchContext = createContext<SearchStateContextData | undefined>(undefined);

interface SearchProviderProps {
  children: React.ReactNode;
  value?: SearchState;
}

const SearchProvider = ({ children, value }: SearchProviderProps): JSX.Element => {
  const [{ searchValue }, setState] = useState<SearchState>(value || defaultState);

  const addSearchValue = (searchValue: string) =>
    setState(state => ({ ...state, searchValue: searchValue.toLowerCase() }));

  const deleteSearchValue = () => setState(state => ({ ...state, searchValue: '' }));

  return (
    <SearchContext.Provider
      value={{ searchValue, addSearchValue, deleteSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error(`useSearch must be used within a SearchProvider`);
  }
  return context;
};

export { SearchProvider, useSearch };
