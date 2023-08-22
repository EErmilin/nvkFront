import {createSlice} from '@reduxjs/toolkit';
import {IScreenState} from '../types/ScreensTypes';

import {getBroadcasts} from '../thunks/screens/broadcasts/GetBroadcasts';
import {getMusics} from '../thunks/screens/musics/GetMusics';
import {getPodcasts} from '../thunks/screens/podcasts/GetPodcasts';
import {logout} from '../thunks/auth/Logout';
import {createFavorite} from '../thunks/favorite/CreateFavorite';
import {removeFavorite} from '../thunks/favorite/RemoveFavorite';
import {fetchFavorite} from '../thunks/favorite/GetFavorites';
import {deleteProfile} from '../thunks/user/DeleteProfile';
import {updateHashtag, updateUser} from '../thunks/user/UpdateUser';

const initialState: IScreenState = {
  broadcasts: [],
  musics: null,
  podcasts: [],
};

const screensSlice = createSlice({
  name: 'screens',
  initialState,
  reducers: {
    setScreenBroadcasts: (state, action) => {
      state.broadcasts = action.payload;
    },
    setScreenMusics: (state, action) => {
      state.musics = action.payload;
    },
    setScreenPodcasts: (state, action) => {
      state.podcasts = action.payload;
    },
    clearScreensState: state => {
      state.broadcasts = [];
      state.musics = null;
      state.podcasts = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getBroadcasts.fulfilled, (state, action) => {
      state.broadcasts = action.payload;
    });
    builder.addCase(getMusics.fulfilled, (state, action) => {
      state.musics = action.payload;
    });
    builder.addCase(getPodcasts.fulfilled, (state, action) => {
      state.podcasts = action.payload;
    });
    builder.addCase(logout.rejected, state => {
      state.broadcasts = [];
      state.musics;
      state.podcasts = [];
    });
    builder.addCase(logout.fulfilled, state => {
      state.broadcasts = [];
      state.musics = null;
      state.podcasts = [];
    });
    builder.addCase(createFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.broadcasts = [];
        state.musics = null;
        state.podcasts = [];
      }
    });
    builder.addCase(removeFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.broadcasts = [];
        state.musics = null;
        state.podcasts = [];
      }
    });
    builder.addCase(fetchFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.broadcasts = [];
        state.musics = null;
        state.podcasts = [];
      }
    });
    builder.addCase(deleteProfile.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.broadcasts = [];
        state.musics = null;
        state.podcasts = [];
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.broadcasts = [];
        state.musics = null;
        state.podcasts = [];
      }
    });
    builder.addCase(updateHashtag.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.broadcasts = [];
        state.musics = null;
        state.podcasts = [];
      }
    });
  },
});

export const {setScreenBroadcasts, setScreenMusics, clearScreensState} =
  screensSlice.actions;
export default screensSlice.reducer;
