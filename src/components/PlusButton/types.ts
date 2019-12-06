import { FabProps } from '@material-ui/core/Fab';
import { LinkProps } from 'react-router-dom';

export interface PlusButtonProps extends FabProps {
  component?: LinkProps['component'];
  to?: LinkProps['to'];
}
