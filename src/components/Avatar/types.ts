import { Maybe, Scalars } from 'buddy-app-schema/build/src/generated/types';

export enum AvatarType {
  REGULAR = 'regular',
  SMALL = 'small',
}

export type AvatarProps = {
  name?: string;
  progress?: number;
  position?: string;
  type?: 'regular' | 'small';
  imgSrc?: Maybe<Scalars['URL']>;
  onClick?: () => void;
};
