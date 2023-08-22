import {createAsyncThunk} from '@reduxjs/toolkit';

import {apolloClient} from '../../../apolloClient';
import {
  UPDATE_HASHTAGS,
  UPDATE_USER,
} from '../../../gql/mutation/user/UpdateUser';
import {IUser} from '../../../models/User';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {IUpdateUserInput} from '../../types/UserTypes';
import {ApolloError} from '@apollo/client';

export const updateUser = createAsyncThunk<IUser, IUpdateUserInput>(
  'user/update',
  async (data, {rejectWithValue, fulfillWithValue}) => {
    try {
      let client = await getUpdateClient();
      let response = await client.mutate({
        mutation: UPDATE_USER,
        variables: {
          updateUserInput: data,
        },
      });
      let cache = apolloClient.cache;
      cache.reset();

      return fulfillWithValue(response.data.updateUser);
    } catch (e) {
      if (e instanceof ApolloError) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue('Error');
      }
    }
  },
);

export const updateHashtag = createAsyncThunk<
  {hashtag: {name: string; id: number}}[],
  {name: string}[]
>('user/update/hashtags', async (data, {rejectWithValue, fulfillWithValue}) => {
  try {
    let client = await getUpdateClient();
    let response = await client.mutate({
      mutation: UPDATE_HASHTAGS,
      variables: {
        updateUserInput: {
          hashtags: data,
        },
      },
    });

    return fulfillWithValue(response.data.updateUser.hashtags);
  } catch (e) {
    if (e instanceof ApolloError) {
      return rejectWithValue(e.message);
    } else {
      return rejectWithValue('Error');
    }
  }
});
