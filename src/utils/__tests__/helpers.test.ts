import { getProgressInPercentages, isNewbie } from 'utils';
import { UserRole } from 'types';

describe('Utils - helpers', () => {
  it('helpers - isNewbie should return true', () => {
    const result = isNewbie(UserRole.Newbie);
    expect(result).toBe(true);
  });

  it('helpers - isNewbie should return false', () => {
    const result = isNewbie(UserRole.Buddy);
    expect(result).toBe(false);
  });

  it('helpers - getProgressInPercentages should return progress as percentage', () => {
    const result = getProgressInPercentages(0.5666666);
    expect(result).toEqual(57);
  });
});
