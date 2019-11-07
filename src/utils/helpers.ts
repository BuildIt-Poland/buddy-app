import { UserRole } from 'types';

export const isNewbie = (role: UserRole) => role === UserRole.Newbie;
