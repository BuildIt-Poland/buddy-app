import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

const TaskCheckbox: React.FC<any> = ({ label, state, onChange }) => {
  return (
    <FormControlLabel
      value={state}
      control={<Checkbox color='primary' onChange={onChange} />}
      label={label}
      labelPlacement='end'
    />
  );
};

export default TaskCheckbox;
