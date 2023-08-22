import {createAsyncThunk} from '@reduxjs/toolkit';

import {apolloClient} from '../../../apolloClient';
import {PROFILE} from '../../../gql/query/user/Profile';
import {IUser} from '../../../models/User';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {ApolloError} from '@apollo/client';

export const getProfile = createAsyncThunk<IUser, undefined>(
  'user/fetch',
  async (_, {rejectWithValue, fulfillWithValue}) => {
    try {
      let client = await getUpdateClient();
      let response = await client.query({
        query: PROFILE,
      });
      let cache = apolloClient.cache;
      cache.reset();

      return fulfillWithValue(response.data.profile);
    } catch (e) {
      if (e instanceof ApolloError) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue('Error');
      }
    }
  },
);
