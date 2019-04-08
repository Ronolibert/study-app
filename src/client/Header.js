import React from 'react';
import Signout from './Signout';
import User from './User';

function Header() {
  return (
    <User>
      {({ data }) => (
        <div>
          {data.me ? (
            <div>
              Welcome back, {data.me.name} <Signout />
            </div>
          ) : (
            <div>Welcome</div>
          )}
        </div>
      )}
    </User>
  );
}

export default Header;
