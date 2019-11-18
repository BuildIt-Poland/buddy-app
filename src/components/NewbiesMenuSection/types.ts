import Maybe from 'graphql/tsutils/Maybe';
import { Newbie } from 'buddy-app-schema';

export type NewbiesListProps = {
  newbies: Maybe<Newbie>[];
  onSelect: (id: string) => void;
};
