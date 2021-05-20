import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
  permission: boolean;
  redirectPath: string;
  hasCodeGround?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { permission, redirectPath, hasCodeGround, ...rest } = props;

  if (!props.permission) {
    const renderComponent = () => (
      <Redirect to={{ pathname: props.redirectPath }} />
    );
    return <Route {...rest} component={renderComponent} render={undefined} />;
  }
  console.log(rest);
  return <Route {...rest} />;
};
