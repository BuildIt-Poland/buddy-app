import { UserRole } from '@buddy-app/schema';

interface Route {
  path: string;
  component: React.FC<any>;
}

interface User {
  routes: Route[];
  redirectPath: string;
}

export interface Users {
  [UserRole.Newbie]: User;
  [UserRole.Buddy]: User;
  [UserRole.Talent]: User;
}
