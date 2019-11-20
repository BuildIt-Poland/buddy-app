import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from 'components/TabPanel';
import AvatarHeader from 'components/AvatarHeader';
import NavBar from 'components/NavBar';

const TasksList: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div data-testid='task-list-page'>
      <NavBar type={'menu'} onClick={() => null} />
      <AvatarHeader />
      <AppBar component='section' position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'>
          <Tab label='Newbie Tasks' />
          <Tab label='My tasks' />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Newbie Tasks Component
      </TabPanel>
      <TabPanel value={value} index={1}>
        My Tasks Component
      </TabPanel>
    </div>
  );
};
export default TasksList;
