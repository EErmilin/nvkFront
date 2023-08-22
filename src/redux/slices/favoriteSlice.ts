import {createSlice} from '@reduxjs/toolkit';
import {IFavoriteState} from '../types/FavoriteTypes';
import {fetchFavorite} from '../thunks/favorite/GetFavorites';
import {createFavorite} from '../thunks/favorite/CreateFavorite';
import {logout} from '../thunks/auth/Logout';
import {removeFavorite} from '../thunks/favorite/RemoveFavorite';
import {deleteProfile} from '../thunks/user/DeleteProfile';
import {updateHashtag, updateUser} from '../thunks/user/UpdateUser';

const initialState: IFavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchFavorite.fulfilled, (state, action) => {
      state.favorites = action.payload.sort(function (a, b) {
        return (
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
        );
      });
    });
    builder.addCase(createFavorite.fulfilled, (state, action) => {
      state.favorites = state.favorites.concat(action.payload);
    });
    builder.addCase(createFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.favorites = [];
      }
    });
    builder.addCase(removeFavorite.fulfilled, (state, action) => {
      state.favorites = state.favorites.filter(
        favorite => favorite.id !== action.payload.id,
      );
    });
    builder.addCase(removeFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.favorites = [];
      }
    });
    builder.addCase(fetchFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.favorites = [];
      }
    });
    builder.addCase(deleteProfile.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.favorites = [];
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.favorites = [];
      }
    });
    builder.addCase(updateHashtag.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.favorites = [];
      }
    });
    builder.addCase(logout.fulfilled, state => {
      state.favorites = [];
    });
    builder.addCase(logout.rejected, state => {
      state.favorites = [];
    });
  },
});

export const {} = favoriteSlice.actions;
export default favoriteSlice.reducer;
