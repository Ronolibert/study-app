import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const DECK_QUERY = gql`
  query DECK($id: ID!) {
    deck(id: $id) {
      title
      description
      cards {
        term
      }
    }
  }
`;
function DeckOfCards({ match }) {
  return (
    <Query query={DECK_QUERY} variables={{ id: match.params.deckId }}>
      {({ data: { deck }, loading, error }) => {
        if (loading) {
          return <div>Loading...</div>;
        }

        return (
          <div>
            <h1>Title: {deck.title}</h1>
            <h2>description: {deck.description}</h2>
            <hr />
            {deck.cards.map(card => (
              <div
                style={{
                  display: 'inline-block',
                  width: 300,
                  border: '1px solid black'
                }}
              >
                {card.term}
              </div>
            ))}
          </div>
        );
      }}
    </Query>
  );
}

export default DeckOfCards;
