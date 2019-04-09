import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import User from './User';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <User>
          {({ data, loading }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            // else if (data.me) {
            // }

            return <Component {...rest} />;
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
export default PrivateRoute;
