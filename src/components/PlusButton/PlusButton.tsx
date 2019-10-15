import React from 'react';
import Fab, { FabProps } from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const PlusButton = (props: FabProps) => (
  <Fab {...props} aria-label='add'>
    <AddIcon />
  </Fab>
);

PlusButton.defaultProps = {
  color: 'primary',
  size: 'medium',
};

export default PlusButton;
