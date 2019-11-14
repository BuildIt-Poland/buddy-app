import { UserRole } from 'types';

export const isNewbie = (role: UserRole) => role === UserRole.Newbie;
export const getProgressInPercentages = (progress: number) =>
  Math.round(progress * 100);
