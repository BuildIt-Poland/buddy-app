import React, { useState } from 'react';

interface MenuState {
  isOpen: boolean;
}

interface MenuContextData extends MenuState {
  toggleMenu: () => void;
}

const defaultState: MenuState = {
  isOpen: false,
};

const defaultContext: MenuContextData = {
  ...defaultState,
  toggleMenu: () => null,
};

const MenuContext = React.createContext<MenuContextData | undefined>(defaultContext);

interface MenuProviderProps {
  children: React.ReactNode;
}

const MenuProvider = ({ children }: MenuProviderProps): JSX.Element => {
  const [state, toggleMenuState] = useState(defaultState);
  const { isOpen } = state;

  const toggleMenu = () => toggleMenuState({ ...state, isOpen: !isOpen });

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        toggleMenu,
      }}>
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => {
  const context = React.useContext(MenuContext);
  if (context === undefined) {
    throw new Error(`useMenu must be used within a MenuProvider`);
  }
  return context;
};

export { MenuProvider, useMenu };
