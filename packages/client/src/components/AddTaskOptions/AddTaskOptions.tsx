import React from 'react';
import { useHistory } from 'react-router-dom';
import { UserRole } from '@buddy-app/schema';
import AddTemplateIcon from '@material-ui/icons/LibraryBooks';
import AddTaskIcon from '@material-ui/icons/LibraryAdd';
import PlusButton from 'atoms/PlusButton';
import DropDown, { ShowOptions, HideOptions } from 'components/DropDown';
import { AddTaskOptionsProps } from './types';
import DICTIONARY from './dictionary';

const AddTaskOptions = (props: AddTaskOptionsProps) => {
  const { to } = props;
  const history = useHistory();

  const renderOptions = (hideOptions: HideOptions) => [
    {
      text: DICTIONARY.OPTIONS.ADD_TEMPLATE_PL,
      Icon: AddTemplateIcon,
      onClick: hideOptions,
      access: {
        [UserRole.Buddy]: true,
      },
    },
    {
      text: DICTIONARY.OPTIONS.ADD_TEMPLATE_ID,
      Icon: AddTemplateIcon,
      onClick: hideOptions,
      access: {
        [UserRole.Buddy]: true,
      },
    },
    {
      text: DICTIONARY.OPTIONS.ADD_TEMPLATE_US,
      Icon: AddTemplateIcon,
      onClick: hideOptions,
      access: {
        [UserRole.Buddy]: true,
      },
    },
    {
      text: DICTIONARY.OPTIONS.ADD_TEMPLATE_UK_IE,
      Icon: AddTemplateIcon,
      onClick: hideOptions,
      access: {
        [UserRole.Buddy]: true,
      },
    },
    {
      text: DICTIONARY.OPTIONS.ADD_TASK,
      Icon: AddTaskIcon,
      onClick: () => {
        hideOptions();
        history.push(to);
      },
      access: {
        [UserRole.Buddy]: true,
      },
    },
  ];

  const renderAnchor = (showOptions: ShowOptions) => (
    <PlusButton {...props} onClick={showOptions} />
  );

  return (
    <DropDown
      id='add-tasks-options'
      renderOptions={renderOptions}
      renderAnchor={renderAnchor}
      marginThreshold={50}
    />
  );
};

export default AddTaskOptions;
