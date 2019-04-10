import React from 'react';
import { Card } from 'antd';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const DECKS_QUERY = gql`
  query {
    decks {
      id
      title
      cards {
        id
      }
    }
  }
`;

function Dashboard() {
  return (
    <div>
      <Query query={DECKS_QUERY}>
        {({ data: { decks } }) => {
          if (decks) {
            return decks.map(({ id, title, cards }) => (
              <div
                key={id}
                style={{
                  display: 'inline-block',
                  width: 300,
                  border: '1px solid black'
                }}
              >
                <h2>{title}</h2>
                <p>{cards.length} terms</p>
              </div>
            ));
          }
          return <div>dsadsa</div>;
        }}
      </Query>
    </div>
  );
}

export { Dashboard as default, DECKS_QUERY };
