import { ReactElement } from 'react';

export enum MenuColors {
  DEFAULT = 'default',
  PAPER = 'paper',
}

export enum MenuShapes {
  DEFAULT = 'default',
  ROUNDED = 'rounded',
}

export enum MenuTypes {
  MENU = 'menu',
  BACK = 'back',
}
export interface HeaderProps {
  type: MenuTypes;
  onButtonClick: () => void;
  loading?: boolean;
  navItems?: React.ReactNode;
  children?: React.ReactNode;
  color?: MenuColors;
  shape?: MenuShapes;
}

export interface NavBarButton {
  [key: string]: () => ReactElement;
}
