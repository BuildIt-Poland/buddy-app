import {
  getProgressInPercentages,
  isNewbie,
  isBuddy,
  isTalent,
  isTemplate,
  isCompleted,
  isNewbieTask,
  isBuddyTask,
  isTemplateTask,
  convertDirectionToAnchor,
  changeTaskStatus,
} from 'utils';
import { UserRole, TaskStatus } from '__mocks__';

describe('Utils - helpers', () => {
  const { Newbie, Buddy, Talent } = UserRole;
  const { Completed, Uncompleted } = TaskStatus;

  it('helpers - isNewbie should return true', () => {
    const result = isNewbie(Newbie);
    expect(result).toBe(true);
  });

  it('helpers - isNewbie should return false', () => {
    const result = isNewbie(Buddy);
    expect(result).toBe(false);
  });

  it('helpers - isBuddy should return true', () => {
    const result = isBuddy(Buddy);
    expect(result).toBe(true);
  });

  it('helpers - isBuddy should return false', () => {
    const result = isBuddy(Newbie);
    expect(result).toBe(false);
  });

  it('helpers - isTalent should return true', () => {
    const result = isTalent(Talent);
    expect(result).toBe(true);
  });

  it('helpers - isTalent should return false', () => {
    const result = isTalent(Newbie);
    expect(result).toBe(false);
  });

  it('helpers - isTemplate should return false', () => {
    const result = isTemplate('');
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

  it('helpers - isBuddyTask should return true', () => {
    const result = isBuddyTask('BuddyTask');
    expect(result).toBe(true);
  });

  it('helpers - isBuddyTask should return false', () => {
    const result = isBuddyTask();
    expect(result).toBe(false);
  });

  it('helpers - isTemplateTask should return false', () => {
    const result = isTemplateTask('');
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

  describe('helpers - changeTaskStatus', () => {
    it('when passing Completed should return Uncompleted', () => {
      const result = changeTaskStatus(Completed);
      expect(result).toBe(Uncompleted);
    });

    it('when passing Uncompleted should return Completed', () => {
      const result = changeTaskStatus(Uncompleted);
      expect(result).toBe(Completed);
    });
  });
});
