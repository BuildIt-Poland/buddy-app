export enum TaskStatus {
  Completed = 'COMPLETED',
  Uncompleted = 'UNCOMPLETED',
}

export type TaskCheckBoxOwnProps = {
  onChange: (id: string) => void;
};
