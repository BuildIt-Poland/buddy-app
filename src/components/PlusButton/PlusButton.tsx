import React from 'react';
import Fab, { FabProps } from '@material-ui/core/Fab';

const PlusButton = (props: FabProps) => <Fab {...props}>+</Fab>;

PlusButton.defaultProps = {
  color: 'primary',
  size: 'medium',
};

export default PlusButton;
