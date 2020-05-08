import { RouteComponentProps } from 'react-router-dom';
import { UserRole, TaskStatus } from '@buddy-app/schema';
import { ROUTES } from 'shared/routes';
import { Direction } from '@material-ui/core/styles';

export const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const isNewbie = (role: UserRole) => role === UserRole.Newbie;
export const isBuddy = (role: UserRole) => role === UserRole.Buddy;
export const isTalent = (role: UserRole) => role === UserRole.Talent;
export const isCompleted = (status: TaskStatus) => status === TaskStatus.Completed;
export const isNewbieTask = (type?: string) => type === 'NewbieTask';
export const isTemplate = (name: string) => name.includes('_TEMPLATES');
export const isTemplateTask = (name: string) => name.includes('TPL_');
export const isTemplateCase = (name: string) =>
  isTemplate(name) || isTemplateTask(name);

export const getProgressInPercentages = (progress: number) =>
  Math.round(progress * 100);

export const convertDirectionToAnchor = (direction: Direction): 'left' | 'right' => {
  switch (direction) {
    case 'rtl':
      return 'right';
    case 'ltr':
      return 'left';
  }
};

export const changeTaskStatus = (status: TaskStatus): TaskStatus =>
  status === TaskStatus.Completed ? TaskStatus.Uncompleted : TaskStatus.Completed;

export const goBack = (history: RouteComponentProps['history']) => {
  if (history.length > 2) {
    history.goBack();
  } else {
    history.push(ROUTES.BASE);
  }
};
