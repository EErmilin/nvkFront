import {createAsyncThunk} from '@reduxjs/toolkit';

import {getUpdateClient} from '../../../requests/updateHeaders';
import {ICreateFavoriteInput, IFavorite} from '../../../models/Favorite';
import {CREATE_FAVORITE} from '../../../gql/mutation/favorite/CreateFavorite';
import {ApolloError} from '@apollo/client';

export const createFavorite = createAsyncThunk<IFavorite, ICreateFavoriteInput>(
  'favorite/create',
  async (data, {rejectWithValue, fulfillWithValue}) => {
    try {
      let client = await getUpdateClient();
      let response = await client.mutate({
        mutation: CREATE_FAVORITE,
        variables: {
          createFavoriteInput: data,
        },
      });
      return fulfillWithValue(response.data.createFavorite);
    } catch (e) {
      if (e instanceof ApolloError) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue('Error');
      }
    }
  },
);
