export interface SnackBarProps {
  message: string;
  isOpen: boolean;
  onClickCloseButton?: (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => void;
}
