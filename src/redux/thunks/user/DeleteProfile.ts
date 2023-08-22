import {createAsyncThunk} from '@reduxjs/toolkit';

import {apolloClient} from '../../../apolloClient';
import {DELETE_PROFILE} from '../../../gql/mutation/user/DeleteProfile';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {ApolloError} from '@apollo/client';

export const deleteProfile = createAsyncThunk<undefined, undefined>(
  'user/delete',
  async (_, {rejectWithValue, fulfillWithValue}) => {
    try {
      let client = await getUpdateClient();
      await client.mutate({
        mutation: DELETE_PROFILE,
      });
      let cache = apolloClient.cache;
      cache.reset();

      return fulfillWithValue(undefined);
    } catch (e) {
      if (e instanceof ApolloError) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue('Error');
      }
    }
  },
);
