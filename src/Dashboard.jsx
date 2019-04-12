import React from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';

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

const DELETE_DECK_MUTATION = gql`
  mutation DELETE_DECK($id: ID!) {
    deleteDeck(id: $id) {
      id
    }
  }
`;

function Dashboard({ history }) {
  return (
    <div>
      <Query query={DECKS_QUERY}>
        {({ data: { decks } }) => {
          if (decks) {
            return decks.map(({ id, title, cards }) => (
              <div
                onClick={e => {
                  history.push(`/deck/${id}`);
                }}
                key={id}
                style={{
                  display: 'inline-block',
                  width: 300,
                  border: '1px solid black'
                }}
              >
                <h2>{title}</h2>
                <p>{cards.length} terms</p>
                <Mutation
                  mutation={DELETE_DECK_MUTATION}
                  refetchQueries={[{ query: DECKS_QUERY }]}
                  variables={{ id }}
                >
                  {deleteDeck => (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        deleteDeck();
                      }}
                    >
                      delete
                    </button>
                  )}
                </Mutation>
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
