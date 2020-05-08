import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { useDialog } from 'contexts/DialogContext';
import { useSnackBar } from 'contexts/SnackbarContext';
import { useLoading } from 'contexts/LoadingContext';
import { UserRole, Mutation, TaskTemplates } from '@buddy-app/schema';
import AddTemplateIcon from '@material-ui/icons/LibraryBooks';
import AddTaskIcon from '@material-ui/icons/LibraryAdd';
import PlusButton from 'atoms/PlusButton';
import DropDown, { ShowOptions, HideOptions } from 'components/DropDown';
import { ADD_FROM_TEMPLATE } from 'graphql/add-from-template.graphql';
import { AddTaskOptionsProps } from './types';
import DICTIONARY from './dictionary';
/* istanbul ignore file */
const AddTaskOptions = (props: AddTaskOptionsProps) => {
  const { to, newbieId, ...restProps } = props;
  const history = useHistory();
  const { showDialog } = useDialog();
  const { showSnackbar } = useSnackBar();
  const { showLoading, hideLoading } = useLoading();

  const onCompleted = () => {
    hideLoading();
    showSnackbar(DICTIONARY.SNACKBAR.SUCCESS);
  };

  const onError = () => {
    hideLoading();
    showSnackbar(DICTIONARY.SNACKBAR.ERROR);
  };

  const [addFromTemplateMutation] = useMutation<Mutation>(ADD_FROM_TEMPLATE, {
    onCompleted,
    onError,
  });

  const addFromTemplate = (template: TaskTemplates) => {
    showLoading();
    addFromTemplateMutation({
      variables: {
        newbieId,
        template,
      },
    });
  };

  const renderOptions = (hideOptions: HideOptions) => [
    {
      text: DICTIONARY.OPTIONS.ADD_TEMPLATE_PL,
      Icon: AddTemplateIcon,
      onClick: () => {
        hideOptions();
        showDialog(
          DICTIONARY.DIALOG.MESSAGE,
          DICTIONARY.OPTIONS.ADD_TEMPLATE_PL,
          () => addFromTemplate(TaskTemplates.TplPl)
        );
      },
      access: {
        [UserRole.Buddy]: true,
        [UserRole.Talent]: true,
      },
    },
    {
      text: DICTIONARY.OPTIONS.ADD_TEMPLATE_IN,
      Icon: AddTemplateIcon,
      onClick: () => {
        hideOptions();
        showDialog(
          DICTIONARY.DIALOG.MESSAGE,
          DICTIONARY.OPTIONS.ADD_TEMPLATE_IN,
          () => addFromTemplate(TaskTemplates.TplIn)
        );
      },
      access: {
        [UserRole.Buddy]: true,
        [UserRole.Talent]: true,
      },
    },
    {
      text: DICTIONARY.OPTIONS.ADD_TEMPLATE_US,
      Icon: AddTemplateIcon,
      onClick: () => {
        hideOptions();
        showDialog(
          DICTIONARY.DIALOG.MESSAGE,
          DICTIONARY.OPTIONS.ADD_TEMPLATE_US,
          () => addFromTemplate(TaskTemplates.TplUs)
        );
      },
      access: {
        [UserRole.Buddy]: true,
        [UserRole.Talent]: true,
      },
    },
    {
      text: DICTIONARY.OPTIONS.ADD_TEMPLATE_UK_IE,
      Icon: AddTemplateIcon,
      onClick: () => {
        hideOptions();
        showDialog(
          DICTIONARY.DIALOG.MESSAGE,
          DICTIONARY.OPTIONS.ADD_TEMPLATE_UK_IE,
          () => addFromTemplate(TaskTemplates.TplUkIe)
        );
      },
      access: {
        [UserRole.Buddy]: true,
        [UserRole.Talent]: true,
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
        [UserRole.Talent]: true,
      },
    },
  ];

  const renderAnchor = (showOptions: ShowOptions) => (
    <PlusButton {...restProps} onClick={showOptions} />
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
