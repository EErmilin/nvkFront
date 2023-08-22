import {createSlice} from '@reduxjs/toolkit';
import {AuthTypes} from '../types/AuthTypes';
import {loginUser} from '../thunks/auth/Login';
import {logout} from '../thunks/auth/Logout';
import {createUser} from '../thunks/user/CreateUser';
import {deleteProfile} from '../thunks/user/DeleteProfile';
import {createFavorite} from '../thunks/favorite/CreateFavorite';
import {removeFavorite} from '../thunks/favorite/RemoveFavorite';
import {fetchFavorite} from '../thunks/favorite/GetFavorites';
import {updateHashtag, updateUser} from '../thunks/user/UpdateUser';

const initialState: AuthTypes = {
  token: null,
  logged: false,
  regionScreen: false,
  carousel: true,
  notification: false,
  isRadio: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setLogged(state, action) {
      state.logged = action.payload;
    },
    setRegionScreen(state, action) {
      state.regionScreen = action.payload;
    },
    setCarousel(state, action) {
      state.carousel = action.payload;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
    builder.addCase(logout.fulfilled, state => {
      state.token = null;
      state.logged = false;
    });
    builder.addCase(logout.rejected, state => {
      state.token = null;
      state.logged = false;
    });
    builder.addCase(createFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.logged = false;
        state.token = null;
      }
    });
    builder.addCase(removeFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.logged = false;
        state.token = null;
      }
    });
    builder.addCase(fetchFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.logged = false;
        state.token = null;
      }
    });
    builder.addCase(deleteProfile.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.logged = false;
        state.token = null;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.logged = false;
        state.token = null;
      }
    });
    builder.addCase(updateHashtag.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.logged = false;
        state.token = null;
      }
    });
  },
});

export const {
  setToken,
  setLogged,
  setRegionScreen,
  setCarousel,
  setNotification,
} = authSlice.actions;
export default authSlice.reducer;
