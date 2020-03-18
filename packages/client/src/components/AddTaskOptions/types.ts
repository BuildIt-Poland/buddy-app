import { LocationDescriptorObject } from 'history';
import { FabProps } from '@material-ui/core/Fab';

export interface AddTaskOptionsProps extends FabProps {
  to: LocationDescriptorObject;
}
