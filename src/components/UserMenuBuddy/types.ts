import { Buddy } from 'buddy-app-schema';

export type UserMenuBuddyProps = {
  buddy: Partial<Buddy>;
  onSelect: (id: string) => void;
};
