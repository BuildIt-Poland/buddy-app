import { MenuProps } from '@material-ui/core/Menu';
import { UserRole } from '@buddy-app/schema';

export interface OptionItem {
  text: string;
  Icon: React.ElementType;
  onClick: () => void;
  access: {
    [UserRole.Newbie]: boolean;
    [UserRole.Buddy]: boolean;
  };
  disabled: boolean;
}

export interface DropDownListProps extends MenuProps {
  options: OptionItem[];
}
