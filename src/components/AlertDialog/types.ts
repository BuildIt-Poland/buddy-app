export interface AlertDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  onClose?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
}
