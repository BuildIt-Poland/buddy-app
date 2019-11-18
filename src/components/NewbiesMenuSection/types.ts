import { Maybe, Newbie } from 'buddy-app-schema';

export type NewbiesListProps = {
  newbies: Maybe<Newbie>[];
  onSelect: (id: string) => void;
};
