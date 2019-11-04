import { User } from '../../../server/src/generated/schema-types';

export type UserMenuDetailsProps = {
  user: Pick<User, 'name' | 'email' | 'photo'>;
};
