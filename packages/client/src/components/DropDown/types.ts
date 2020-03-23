import { MenuProps } from '@material-ui/core/Menu';
import { UserRole } from '@buddy-app/schema';

export type ShowOptions = (e: React.MouseEvent<HTMLButtonElement>) => void;
export type HideOptions = () => void;

export interface OptionItem {
  text: string;
  Icon?: React.ElementType;
  onClick: () => void;
  access: {
    [UserRole.Newbie]?: boolean;
    [UserRole.Buddy]?: boolean;
  };
  disabled?: boolean;
}

export interface DropDownProps extends Partial<MenuProps> {
  renderOptions: (hideOptions: HideOptions) => OptionItem[];
  renderAnchor: (showOptions: ShowOptions) => JSX.Element;
}
