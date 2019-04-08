import ApolloClient from 'apollo-boost';

const endpoint = `http://localhost:9000`;
const prodEndpoint = 'TBD';

function createClient() {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        }
      });
    }
  });
}

export { createClient as default };
