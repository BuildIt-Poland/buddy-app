export enum AvatarType {
  REGULAR = 'regular',
  SMALL = 'small',
}

export type AvatarProps = {
  name?: string;
  progress?: number;
  position?: string;
  type?: 'regular' | 'small';
  imgSrc?: string;
};
