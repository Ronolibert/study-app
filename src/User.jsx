import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
    }
  }
`;

function User(props) {
  return (
    <Query {...props} query={CURRENT_USER_QUERY}>
      {payload => props.children(payload)}
    </Query>
  );
}

export { User as default, CURRENT_USER_QUERY };
