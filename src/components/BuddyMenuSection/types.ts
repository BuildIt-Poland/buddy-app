import { Buddy } from 'buddy-app-schema';

export type BuddyMenuSectionProps = {
  buddy: Partial<Buddy>;
  onSelect: (id: string) => void;
};
