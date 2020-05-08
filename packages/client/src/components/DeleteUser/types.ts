import { UserRole } from '@buddy-app/schema';

export interface DeleteUserProps {
  userId: string;
  userRole: UserRole;
}
