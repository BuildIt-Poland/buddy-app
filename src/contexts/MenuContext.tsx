import React from 'react';

export interface State {
  isOpen: boolean;
}

export interface MenuContextData extends State {
  toggleMenu: () => void;
}

export const defaultState: State = {
  isOpen: false,
};

const defaultContext: MenuContextData = {
  ...defaultState,
  toggleMenu: () => null,
};

const MenuContext = React.createContext<MenuContextData>(defaultContext);

export default MenuContext;
