import React from 'react';
import { MenuColors, MenuShapes, MenuTypes, HeaderProps } from 'components/Header';

const Header = ({ onButtonClick, navItems, ...props }: HeaderProps) => {
  return <header {...props} />;
};

export { MenuColors, MenuShapes, MenuTypes };
export default Header;
