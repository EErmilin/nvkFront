import {createSlice} from '@reduxjs/toolkit';
import {UserTypes} from '../types/UserTypes';
import {createUser} from '../thunks/user/CreateUser';
import {loginUser} from '../thunks/auth/Login';
import {logout} from '../thunks/auth/Logout';
import {updateHashtag, updateUser} from '../thunks/user/UpdateUser';
import {getProfile} from '../thunks/user/GetProfile';
import {deleteProfile} from '../thunks/user/DeleteProfile';
import {createFavorite} from '../thunks/favorite/CreateFavorite';
import {removeFavorite} from '../thunks/favorite/RemoveFavorite';
import {fetchFavorite} from '../thunks/favorite/GetFavorites';

const initialState: UserTypes = {
  data: null,
  subscribers: 0,
  subscribes: 0,
  listSearch: [],
  hashtags: [],
  code: "",
  colorTheme: localStorage.getItem('app-theme') || 'light',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setTheme: (state, action) => {
      state.colorTheme = action.payload;
    },
    
    setUser: (state, action) => {
      state.data = action.payload;
    },
    clearUser: state => {
      state.data = null;
    },
    setListSearch: (state, action) => {
      state.listSearch = action.payload;
    },
    addListSearch: (state, action) => {
      if (!state.listSearch.includes(action.payload)) {
        let temp = state.listSearch;
        temp.unshift(action.payload);
        state.listSearch = temp;
      }
    },
    removeItemListSearch: (state, action) => {
      state.listSearch = state.listSearch.filter(
        item => item !== action.payload,
      );
    },
    addHashtag: (state, action) => {
      let temp = state.hashtags.map(hashtag => hashtag.hashtag.name);
      if (!temp.includes(action.payload)) {
        state.hashtags = state.hashtags.concat({
          hashtag: {name: action.payload, id: 0},
        });
      }
    },
    removeHashtag: (state, action) => {
      state.hashtags = state.hashtags.filter(
        hashtag => hashtag.hashtag.name !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.data = action.payload.user;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.data = action.payload.user;
      state.hashtags = action.payload.user.hashtags ?? [];
    });
    builder.addCase(logout.fulfilled, state => {
      state.data = null;
      state.listSearch = [];
      state.hashtags = [];
    });
    builder.addCase(logout.rejected, state => {
      state.data = null;
      state.listSearch = [];
      state.hashtags = [];
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.hashtags = action.payload.hashtags ?? [];
    });
    builder.addCase(updateHashtag.fulfilled, (state, action) => {
      state.hashtags = action.payload;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.data = action.payload;
      state.hashtags = action.payload.hashtags ?? [];
    });
    builder.addCase(deleteProfile.fulfilled, state => {
      state.data = null;
      state.listSearch = [];
      state.hashtags = [];
    });
    builder.addCase(deleteProfile.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.data = null;
        state.listSearch = [];
        state.hashtags = [];
      }
    });
    builder.addCase(createFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.data = null;
        state.listSearch = [];
        state.hashtags = [];
      }
    });
    builder.addCase(removeFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.data = null;
        state.listSearch = [];
        state.hashtags = [];
      }
    });
    builder.addCase(fetchFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.data = null;
        state.listSearch = [];
        state.hashtags = [];
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.data = null;
        state.listSearch = [];
        state.hashtags = [];
      }
    });
    builder.addCase(updateHashtag.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.data = null;
        state.listSearch = [];
        state.hashtags = [];
      }
    });
  },
});

export const {
  setTheme,
  setCode,
  setUser,
  clearUser,
  setListSearch,
  addListSearch,
  removeItemListSearch,
  addHashtag,
  removeHashtag,
} = userSlice.actions;
export default userSlice.reducer;
