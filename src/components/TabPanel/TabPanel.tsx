import React from 'react';
import Box from '@material-ui/core/Box';
import { TabPanelProps } from './types';

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <Box hidden={value !== index} {...other}>
      {children}
    </Box>
  );
};

export default TabPanel;
