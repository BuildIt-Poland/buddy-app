import { RouteComponentProps } from 'react-router-dom';
import { SnackBarProps } from 'decorators/withSnackBar';

export interface AddTaskProps extends RouteComponentProps, SnackBarProps {}
