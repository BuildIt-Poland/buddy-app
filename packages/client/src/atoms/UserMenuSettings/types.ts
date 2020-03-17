export type UserMenuSettingsProps = {
  allowPushedNotifications: boolean;
  updatePushNotificationsSettings: () => void;
  onLogoutClick?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined;
};
