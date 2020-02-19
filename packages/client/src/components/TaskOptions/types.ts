import { UserRole } from '@buddy-app/schema';

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

export interface TaskOptionsProps {
  id: string;
}
