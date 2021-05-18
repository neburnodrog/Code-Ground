import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export type ProtectedRouteProps = {
  permission: boolean;
  redirectPath: string;
  hasCodeGround?: boolean;
} & RouteProps;

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  if (!props.permission) {
    const renderComponent = () => (
      <Redirect to={{ pathname: props.redirectPath }} />
    );
    return <Route {...props} component={renderComponent} render={undefined} />;
  }
  return <Route {...props} />;
};
