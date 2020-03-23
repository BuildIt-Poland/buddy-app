import { BoxProps } from '@material-ui/core/Box';

export interface TabPanelProps extends BoxProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
