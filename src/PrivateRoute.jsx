import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import User from './User';

function PrivateRoute({ component: Component, path, ...rest }) {
  return (
    <Route
      {...rest}
      path={path}
      render={props => (
        <User>
          {({ data, loading }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            // else if (data.me) {
            // }
            return <Component {...rest} {...props} />;
            // return (
            //   <Redirect
            //     to={{
            //       pathname: '/login',
            //       state: { from: props.location }
            //     }}
            //   />
            // );
          }}
        </User>
      )}
    />
  );
}
export default withRouter(PrivateRoute);
