import {createAsyncThunk} from '@reduxjs/toolkit';

import {getUpdateClient} from '../../../requests/updateHeaders';
import {REMOVE_FAVORITE} from '../../../gql/mutation/favorite/RemoveFavorite';
import {ApolloError} from '@apollo/client';

export const removeFavorite = createAsyncThunk<{id: number}, number>(
  'favorite/remove',
  async (id, {rejectWithValue, fulfillWithValue}) => {
    try {
      let client = await getUpdateClient();
      let response = await client.mutate({
        mutation: REMOVE_FAVORITE,
        variables: {
          removeFavoriteId: id,
        },
      });
      return fulfillWithValue(response.data.removeFavorite);
    } catch (e) {
      if (e instanceof ApolloError) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue('Error');
      }
    }
  },
);
