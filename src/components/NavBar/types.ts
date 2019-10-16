import { ReactElement } from 'react';

export interface NavBarProps {
  type: 'menu' | 'back';
  onClick: () => void;
}

export interface NavBarButton {
  [key: string]: () => ReactElement;
}
