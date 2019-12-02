import { RouteComponentProps } from 'react-router-dom';
import { SnackBarProps } from 'decorators/withSnackBar';

export interface TaskDetailsProps extends RouteComponentProps, SnackBarProps {}
