import {createAsyncThunk} from '@reduxjs/toolkit';

import {
  AUTHOR,
  AUTHOR_CREATE,
  AUTHOR_SUBSCRIBE,
  AUTHOR_SUBSCRIPTIONS,
  AUTHOR_UPDATE,
  ME_AUTHOR,
} from '../../../gql/query/author/Author';
import {IAuthor, IAuthorData, IAuthorInput} from '../../../models/Author';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {
  IGetAuthorArg,
  IGetAuthorSubArg,
  ISubscribeArg,
} from '../../types/AuthorTypes';

export const getAuthor = createAsyncThunk<IAuthorData, IGetAuthorArg>(
  'author/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: AUTHOR,
      variables: data,
    });
    return response.data as IAuthorData;
  },
);

export const getMeAuthor = createAsyncThunk<IAuthorData, IGetAuthorArg>(
  'me-author/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: ME_AUTHOR,
      variables: data,
    });
    return response.data as IAuthorData;
  },
);

export const authorSubscribe = createAsyncThunk<boolean | null, ISubscribeArg>(
  'author-subscribe/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.mutate({
      mutation: AUTHOR_SUBSCRIBE,
      variables: data,
    });
    return response.data?.authorSubscribe?.isSubscribe as boolean | null;
  },
);

export const getAuthorSubscriptions = createAsyncThunk<
  IAuthor[],
  IGetAuthorSubArg
>('author-subscriptions/fetch', async data => {
  let client = await getUpdateClient();
  let response = await client.query({
    query: AUTHOR_SUBSCRIPTIONS,
    variables: data,
  });
  return response.data.items as IAuthor[];
});

export const authorCreate = createAsyncThunk<any, IAuthorInput>(
  'author-create/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.mutate({
      mutation: AUTHOR_CREATE,
      variables: {
        data: data,
      },
    });
    return response.data?.item;
  },
);

export const authorUpdate = createAsyncThunk<any, IAuthorInput>(
  'author-update/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.mutate({
      mutation: AUTHOR_UPDATE,
      variables: {
        data: data,
      },
    });
    return response.data?.item;
  },
);
