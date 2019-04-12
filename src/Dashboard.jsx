import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Mutation, Query } from 'react-apollo';
import { FOLDERS_QUERY } from './Sidebar';

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

const CREATE_FOLDER_MUTATION = gql`
  mutation CREATE_FOLDER($name: String!) {
    createFolder(name: $name) {
      name
    }
  }
`;

function Dashboard({ history }) {
  const [folderName, setFolderName] = useState('');
  return (
    <div>
      <Query query={DECKS_QUERY}>
        {({ data: { decks } }) => (
          <div>
            dashboard page
            <Mutation
              mutation={CREATE_FOLDER_MUTATION}
              refetchQueries={[{ query: FOLDERS_QUERY }]}
              variables={{ name: folderName }}
            >
              {createFolder => (
                <>
                  <input onChange={e => setFolderName(e.target.value)} />
                  <button
                    onClick={() => {
                      createFolder();
                      setFolderName('');
                    }}
                  >
                    create folder
                  </button>
                </>
              )}
            </Mutation>
            {decks &&
              decks.map(({ id, title, cards }) => (
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
              ))}
          </div>
        )}
      </Query>
    </div>
  );
}

export { Dashboard as default, DECKS_QUERY };
