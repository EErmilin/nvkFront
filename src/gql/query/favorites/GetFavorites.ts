import {createAsyncThunk} from '@reduxjs/toolkit';

import {getUpdateClient} from '../../../requests/updateHeaders';
import {FAVORITES} from '../../../gql/query/favorites/Favorites';
import {IFavorite} from '../../../models/Favorite';
import {ApolloError} from '@apollo/client';

export const fetchFavorite = createAsyncThunk<
  IFavorite[],
  string | null | undefined
>('favorite/fetch', async (token, {rejectWithValue, fulfillWithValue}) => {
  try {
    let client = await getUpdateClient(token);
    let response = await client.query({
      query: FAVORITES,
    });

    return fulfillWithValue(response.data.favorites);
  } catch (e) {
    if (e instanceof ApolloError) {
      return rejectWithValue(e.message);
    } else {
      return rejectWithValue('Error');
    }
  }
});
