import { isNewbie } from 'utils';
import { UserRole } from 'buddy-app-schema';

describe('Utils - helpers', () => {
  it('helpers - isNewbie should return true', () => {
    const result = isNewbie(UserRole.Newbie);
    expect(result).toBe(true);
  });

  it('helpers - isNewbie should return false', () => {
    const result = isNewbie(UserRole.Buddy);
    expect(result).toBe(false);
  });
});
