import { ReactElement } from 'react';

export interface HeaderProps {
  type: 'menu' | 'back';
  onButtonClick?: () => void;
  children?: React.ReactNode;
  color?: 'default' | 'paper';
}

export interface NavBarButton {
  [key: string]: () => ReactElement;
}
