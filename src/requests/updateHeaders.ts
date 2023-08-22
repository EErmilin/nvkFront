import {HttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {apolloClient} from '../apolloClient';
import {GRAPHQL_URL} from '../api/config';

const getToken = async () => {
  try {
    let data = null//await AsyncStorage.getItem('persist:root');
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

export const getUpdateClient = async (inToken?: string | null) => {
  let token = await getToken();

  const authLink = setContext(async (_, {headers}) => {
    return {
      headers: {
        ...headers,
        authorization: token || inToken ? `Bearer ${inToken ?? token}` : '',
      },
    };
  });

  const httpLink = new HttpLink({
    uri: GRAPHQL_URL,
  });

  apolloClient.setLink(authLink.concat(httpLink));

  return apolloClient;
};
