import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function resetFields() {
    setEmail('');
    setName('');
    setPassword('');
  }

  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      variables={{ name, password, email }}
    >
      {(signup, { error, loading }) => (
        <form
          action="post"
          onSubmit={async e => {
            e.preventDefault();
            await signup();
            resetFields();
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign Up </h2>
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
            <label htmlFor="name">
              Name
              <input
                onChange={e => {
                  setName(e.target.value);
                }}
                type="text"
                name="name"
                placeholder="name"
                value={name}
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

            <button type="submit">Sign Up!</button>
          </fieldset>
        </form>
      )}
    </Mutation>
  );
}

export default Signup;
