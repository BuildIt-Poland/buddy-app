import { Maybe, Newbie } from '@buddy-app/schema';

export type UserMenuNewbiesProps = {
  newbies: Maybe<Newbie>[];
  onSelect: (id: string) => void;
};
