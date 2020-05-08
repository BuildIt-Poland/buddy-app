import { UserInput, User } from '@buddy-app/schema';

export interface FormData extends UserInput {
  email: string;
  name: string;
}

export interface UserFormProps {
  loading: boolean;
  data?: User;
  isNewbie?: boolean;
  onSubmit: (input: UserInput) => void;
}
