import { ReactElement } from 'react';
import { AppBarProps } from '@material-ui/core/AppBar';

export interface HeaderProps extends AppBarProps {
  type: 'menu' | 'back';
  onButtonClick?: () => void;
  children?: ReactElement;
}

export interface NavBarButton {
  [key: string]: () => ReactElement;
}
