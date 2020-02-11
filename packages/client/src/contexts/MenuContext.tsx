import React, { useState, useContext, createContext } from 'react';

interface MenuState {
  isOpen: boolean;
}

interface MenuStateContextData extends MenuState {
  toggleMenu: () => void;
}

const defaultState: MenuState = {
  isOpen: false,
};

const MenuContext = createContext<MenuStateContextData | undefined>(undefined);

interface MenuProviderProps {
  children: React.ReactNode;
  value?: MenuState;
}

const MenuProvider = ({ children, value }: MenuProviderProps): JSX.Element => {
  const [{ isOpen }, setState] = useState<MenuState>(value || defaultState);

  const toggleMenu = () => setState(state => ({ ...state, isOpen: !state.isOpen }));

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error(`useMenu must be used within a MenuProvider`);
  }
  return context;
};

export { MenuProvider, useMenu };
