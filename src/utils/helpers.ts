import { UserRole } from 'buddy-app-schema';

export const isNewbie = (role: UserRole) => role === UserRole.Newbie;
export const isBuddy = (role: UserRole) => role === UserRole.Buddy;
