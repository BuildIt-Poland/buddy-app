import React from 'react';
import { UserRole } from '@buddy-app/schema';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import PlusButton from 'atoms/PlusButton';
import DropDown, { ShowOptions, HideOptions } from 'components/DropDown';
import { AddTasksButtonProps } from './types';
import DICTIONARY from './dictionary';

const AddTasksButton = (props: AddTasksButtonProps) => {
  const renderOptions = (hideOptions: HideOptions) => [
    {
      text: DICTIONARY.OPTIONS.EDIT,
      Icon: EditIcon,
      onClick: hideOptions,
      access: {
        [UserRole.Buddy]: true,
      },
    },
    {
      text: DICTIONARY.OPTIONS.COPY_LINK,
      Icon: FileCopyIcon,
      onClick: hideOptions,
      access: {
        [UserRole.Buddy]: true,
      },
    },
    {
      text: DICTIONARY.OPTIONS.ADD_TASK,
      Icon: AddIcon,
      onClick: hideOptions,
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

export default AddTasksButton;
