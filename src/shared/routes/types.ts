import React from 'react';

export type RouteProps = {
  url: string;
  component: React.ComponentType<any>;
};

export type Routes = {
  [key: string]: RouteProps | { [key: string]: RouteProps };
};
