import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

const DECK_QUERY = gql`
  query DECK($id: ID!) {
    deck(id: $id) {
      title
      description
      cards {
        id
        term
      }
    }
  }
`;

const DELETE_CARD_MUTATION = gql`
  mutation DELETE_CARD($id: ID!) {
    deleteCard(id: $id) {
      id
    }
  }
`;
function DeckOfCards({ match }) {
  const deckId = match.params.deckId;
  return (
    <Query query={DECK_QUERY} variables={{ id: deckId }}>
      {({ data: { deck }, loading, error }) => {
        if (loading) {
          return <div>Loading...</div>;
        }

        return (
          <div>
            <h1>Title: {deck.title}</h1>
            <h2>description: {deck.description}</h2>
            <hr />
            {deck.cards.map(({ term, id }) => (
              <div
                style={{
                  display: 'inline-block',
                  width: 300,
                  border: '1px solid black'
                }}
              >
                {term}
                id: #{id}
                <Mutation
                  mutation={DELETE_CARD_MUTATION}
                  key={id}
                  refetchQueries={[
                    { query: DECK_QUERY, variables: { id: deckId } }
                  ]}
                  variables={{ id }}
                >
                  {deleteCard => <button onClick={deleteCard}>Delete</button>}
                </Mutation>
              </div>
            ))}
          </div>
        );
      }}
    </Query>
  );
}

export default DeckOfCards;
