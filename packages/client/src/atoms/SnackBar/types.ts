export interface SnackBarProps {
  isOpen: boolean;
  message: string;
  onClose?: () => void;
}
