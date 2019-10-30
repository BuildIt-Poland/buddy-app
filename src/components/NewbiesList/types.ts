import { Newbie } from '../../../server/src/generated/schema-types';

export type NewbiesListProps = {
  newbies: Partial<Newbie>[];
};
