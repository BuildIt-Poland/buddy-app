import { Mutation, MutationDeleteTaskArgs } from 'buddy-app-schema';
import { MutationTuple } from '@apollo/react-hooks';

export interface TaskOptions {
  taskOptionHandlers?: {
    deleteTask: MutationTuple<Mutation, MutationDeleteTaskArgs>[0];
  };
}

export interface TaskOptionsProps extends TaskOptions {
  id: string;
}
