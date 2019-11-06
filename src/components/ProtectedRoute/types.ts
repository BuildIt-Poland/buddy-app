import React from 'react';
import { RouteProps } from 'react-router';

export type ProtectedRouteProps = { component: React.ComponentType<any> } & Partial<
  RouteProps
>;
