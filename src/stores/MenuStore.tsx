import React, { useState } from 'react';
import MenuContext, { defaultState } from 'contexts/MenuContext';

interface MenuStoreProps {
  children: React.ReactNode;
}

const MenuStore = (props: MenuStoreProps): JSX.Element => {
  const [state, toggleMenuState] = useState(defaultState);
  const { isOpen } = state;
  const toggleMenu = () => toggleMenuState({ ...state, isOpen: !isOpen });

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        toggleMenu,
      }}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuStore;
