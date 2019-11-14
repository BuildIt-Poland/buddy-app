import { isNewbie } from 'utils';
import { mockSchemaTypes } from '__mocks__';

jest.mock('buddy-app-schema', () => ({
  UserRole: {
    Newbie: 'NEWBIE',
    Buddy: 'BUDDY',
  },
}));

describe('Utils - helpers', () => {
  const userRole = mockSchemaTypes().UserRole;

  it('helpers - isNewbie should return true', () => {
    const result = isNewbie(userRole.Newbie);
    expect(result).toBe(true);
  });

  it('helpers - isNewbie should return false', () => {
    const result = isNewbie(userRole.Buddy);
    expect(result).toBe(false);
  });
});
