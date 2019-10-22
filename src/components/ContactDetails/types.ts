// FIXME: maybe Pick is better?
import { Newbie } from '../../../server/src/generated/schema-types';

export type ContactDetailsParams = {
  newbieId: string;
};

export type NewbieData = {
  newbie: Partial<Newbie>;
};
