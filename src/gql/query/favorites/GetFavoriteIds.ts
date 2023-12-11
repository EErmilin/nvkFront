import {createAsyncThunk} from '@reduxjs/toolkit';

import {ApolloError} from '@apollo/client';
import {GET_FAVORITE_IDS} from '../../../gql/query/favorites/Favorites';
import {IFavoriteId} from '../../../models/Favorite';
import {getUpdateClient} from '../../../requests/updateHeaders';

export const fetchFavoriteIds = createAsyncThunk<
  IFavoriteId[],
  string | null | undefined
>('favorite/fetchIds', async (token, {rejectWithValue, fulfillWithValue}) => {
  try {
    let client = await getUpdateClient(token);
    let response = await client.query({
      query: GET_FAVORITE_IDS,
    });

    return fulfillWithValue(response.data.favoriteIds);
  } catch (e) {
    if (e instanceof ApolloError) {
      return rejectWithValue(e.message);
    } else {
      return rejectWithValue('Error');
    }
  }
});
