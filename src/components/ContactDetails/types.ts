import { RouteComponentProps } from 'react-router-dom';
import { Newbie } from '../../../server/src/generated/schema-types';

export type ContactDetailsParams = {
  newbieId: string;
};

export type NewbieData = {
  newbie: Partial<Newbie>;
};

export type ContactDetailsProps = Pick<RouteComponentProps, 'history'>;
