import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TaskStatus, Newbie } from 'buddy-app-schema';
import TabPanel from '../TabPanel';
import TabContent from '../TaskTabsContent';

const tasks = [
  {
    title: 'Call you head manager',
    id: '1',
    description: '',
    createdAt: '',
    implementationDate: '',
    status: TaskStatus.Uncompleted,
    newbie: {} as Newbie,
  },
  {
    title: 'Call you head manager',
    id: '11',
    description: '',
    createdAt: '',
    implementationDate: '',
    status: TaskStatus.Uncompleted,
    newbie: {} as Newbie,
  },
  {
    title: 'Call you head manager',
    id: '12',
    description: '',
    createdAt: '',
    implementationDate: '',
    status: TaskStatus.Uncompleted,
    newbie: {} as Newbie,
  },
  {
    title: 'Call you head manager',
    id: '13',
    description: '',
    createdAt: '',
    implementationDate: '',
    status: TaskStatus.Uncompleted,
    newbie: {} as Newbie,
  },
  {
    title: 'Call you head manager',
    id: '14',
    description: '',
    createdAt: '',
    implementationDate: '',
    status: TaskStatus.Uncompleted,
    newbie: {} as Newbie,
  },
  {
    title: 'Call you head manager',
    id: '15',
    description: '',
    createdAt: '',
    implementationDate: '',
    status: TaskStatus.Uncompleted,
    newbie: {} as Newbie,
  },
  {
    title: 'Call you head manager',
    id: '16',
    description: '',
    createdAt: '',
    implementationDate: '',
    status: TaskStatus.Uncompleted,
    newbie: {} as Newbie,
  },
  {
    title: 'Call you head manager',
    id: '17',
    description: '',
    createdAt: '',
    implementationDate: '',
    status: TaskStatus.Uncompleted,
    newbie: {} as Newbie,
  },
  {
    title: 'Call you head manager',
    id: '18',
    description: '',
    createdAt: '',
    implementationDate: '',
    status: TaskStatus.Uncompleted,
    newbie: {} as Newbie,
  },
  {
    title: 'Call you head manager',
    id: '19',
    description: '',
    createdAt: '',
    implementationDate: '',
    status: TaskStatus.Uncompleted,
    newbie: {} as Newbie,
  },
  {
    title: 'Call you main manager',
    id: '2',
    description: '',
    createdAt: '',
    implementationDate: '',
    status: TaskStatus.Uncompleted,
    newbie: {} as Newbie,
  },
  {
    title: 'Write you main manager',
    id: '3',
    description: '',
    createdAt: '',
    implementationDate: '',
    status: TaskStatus.Completed,
    newbie: {} as Newbie,
  },
];

const TasksList: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div data-testid='task-list-page'>
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
        <TabContent tasks={tasks} uncompletedCount={2} completedCount={1} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabContent tasks={tasks} uncompletedCount={2} completedCount={1} />
      </TabPanel>
    </div>
  );
};
export default TasksList;
