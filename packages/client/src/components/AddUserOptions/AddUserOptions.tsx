import React from 'react';
import { useHistory } from 'react-router-dom';
import { UserRole } from '@buddy-app/schema';
import AddUserIcon from '@material-ui/icons/PersonAdd';
import PlusButton from 'atoms/PlusButton';
import DropDown, { ShowOptions } from 'components/DropDown';
import { ROUTES } from 'shared/routes';
import { AddUserOptionsProps } from './types';
import DICTIONARY from './dictionary';

const AddUserOptions = (props: AddUserOptionsProps) => {
  const history = useHistory();

  const renderOptions = () => [
    {
      text: DICTIONARY.OPTIONS.ADD_BUDDY,
      Icon: AddUserIcon,
      onClick: () => history.push(ROUTES.TALENT_ADD_BUDDY),
      access: {
        [UserRole.Talent]: true,
      },
    },
    {
      text: DICTIONARY.OPTIONS.ADD_TALENT,
      Icon: AddUserIcon,
      onClick: () => history.push(ROUTES.TALENT_ADD_TALENT),
      access: {
        [UserRole.Talent]: true,
      },
    },
  ];

  const renderAnchor = (showOptions: ShowOptions) => (
    <PlusButton {...props} onClick={showOptions} />
  );

  return (
    <DropDown
      id='add-user-options'
      renderOptions={renderOptions}
      renderAnchor={renderAnchor}
      marginThreshold={50}
    />
  );
};

export default AddUserOptions;
