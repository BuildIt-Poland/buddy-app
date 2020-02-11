import { UserRole, Mutation, MutationDeleteTaskArgs } from '@buddy-app/schema';
import { MutationTuple } from '@apollo/react-hooks';

export interface TaskOptionItem {
  text: string;
  Icon: React.ElementType;
  onClick: () => void;
  access: {
    [UserRole.Newbie]: boolean;
    [UserRole.Buddy]: boolean;
  };
  disabled: boolean;
}
export interface TaskOptions {
  taskOptionHandlers?: {
    deleteTask: MutationTuple<Mutation, MutationDeleteTaskArgs>[0];
  };
}

export interface TaskOptionsProps extends TaskOptions {
  id: string;
}
