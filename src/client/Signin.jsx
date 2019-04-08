import React, { useState } from 'react';

function Signin() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function resetFields() {
    setEmail('');
    setName('');
    setPassword('');
  }

  return (
    <form
      action="POST"
      onSubmit={e => {
        e.preventDefault();
        resetFields();
      }}
    >
      <fieldset>
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

        <button type="submit">Sign In!</button>
      </fieldset>
    </form>
  );
}

export default Signin;
