import {
  getProgressInPercentages,
  isNewbie,
  isCompleted,
  isNewbieTask,
  convertDirectionToAnchor,
} from 'utils';
import { UserRole, TaskStatus } from '__mocks__';

describe('Utils - helpers', () => {
  const { Newbie, Buddy } = UserRole;
  const { Completed, Uncompleted } = TaskStatus;

  it('helpers - isNewbie should return true', () => {
    const result = isNewbie(Newbie);
    expect(result).toBe(true);
  });

  it('helpers - isNewbie should return false', () => {
    const result = isNewbie(Buddy);
    expect(result).toBe(false);
  });

  it('helpers - isCompleted should return true', () => {
    const result = isCompleted(Completed);
    expect(result).toBe(true);
  });

  it('helpers - isCompleted should return false', () => {
    const result = isCompleted(Uncompleted);
    expect(result).toBe(false);
  });

  it('helpers - isNewbieTask should return true', () => {
    const result = isNewbieTask('NewbieTask');
    expect(result).toBe(true);
  });

  it('helpers - isNewbieTask should return false', () => {
    const result = isNewbieTask();
    expect(result).toBe(false);
  });

  it('helpers - getProgressInPercentages should return progress as percentage', () => {
    const result = getProgressInPercentages(0.5666666);
    expect(result).toEqual(57);
  });

  describe('helpers - convertDirectionToAnchor', () => {
    it('when passing rtl should return right', () => {
      expect(convertDirectionToAnchor('rtl')).toEqual('right');
    });

    it('when passing ltr should return left', () => {
      expect(convertDirectionToAnchor('ltr')).toEqual('left');
    });
  });
});
