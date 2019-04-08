import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function resetFields() {
    setEmail('');
    setPassword('');
  }

  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      variables={{ email, password }}
    >
      {(signin, { error, loading }) => (
        <form
          action="post"
          onSubmit={async e => {
            e.preventDefault();
            await signin();
            resetFields();
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign In </h2>
            <label htmlFor="email">
              Email
              <input
                onChange={e => {
                  setEmail(e.target.value);
                }}
                type="email"
                name="email"
                placeholder="email"
                value={email}
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                onChange={e => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="password"
                placeholder="password"
                value={password}
              />
            </label>

            <button type="submit">Sign In!</button>
          </fieldset>
        </form>
      )}
    </Mutation>
  );
}

export default SignIn;
