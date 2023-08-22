import {
  ApolloClient,
  InMemoryCache,
  DefaultOptions,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client';
import {GRAPHQL_URL} from '../api/config';

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const getToken = async () => {
  try {
    let data = null // await AsyncStorage.getItem('persist:root');
    if (data !== null) {
      let jsonData = JSON.parse(data);
      return JSON.parse(jsonData.auth).token;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(async ({headers = {}}) => {
    const token = await getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  return forward(operation);
});

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
  },
  query: {
    fetchPolicy: 'no-cache',
  },
};

export const apolloClient = new ApolloClient({
  link: concat(httpLink, authMiddleware),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  defaultOptions: defaultOptions,
});
