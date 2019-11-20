import { isNewbie } from 'utils';
import { UserRole } from '__mocks__';

describe('Utils - helpers', () => {
  const { Newbie, Buddy } = UserRole;

  it('helpers - isNewbie should return true', () => {
    const result = isNewbie(Newbie);
    expect(result).toBe(true);
  });

  it('helpers - isNewbie should return false', () => {
    const result = isNewbie(Buddy);
    expect(result).toBe(false);
  });
});
