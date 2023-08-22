import {createSlice} from '@reduxjs/toolkit';

import {IPostState} from '../types/PostTypes';
import {getPosts} from '../thunks/post/GetPosts';
import {logout} from '../thunks/auth/Logout';
import {deleteProfile} from '../thunks/user/DeleteProfile';
import {createFavorite} from '../thunks/favorite/CreateFavorite';
import {removeFavorite} from '../thunks/favorite/RemoveFavorite';
import {updateHashtag, updateUser} from '../thunks/user/UpdateUser';

const initialState: IPostState = {
  data: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.data = action.payload;
    },
    clearPosts: state => {
      state.data = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      let prevData = state.data;
      let prevDataIds = prevData.map(item => item.id);
      let newData = action.payload;
      newData.map(item => {
        if (!prevDataIds.includes(item.id)) {
          prevData.push(item);
        } else {
          if (prevData.find(item2 => item2.id === item.id)) {
            prevData[prevData.findIndex(item2 => item2.id === item.id)] = item;
          }
        }
      });
      state.data = prevData.sort(function (a, b) {
        return (
          new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf()
        );
      });
    });
    builder.addCase(logout.fulfilled, state => {
      state.data = [];
    });
    builder.addCase(logout.rejected, state => {
      state.data = [];
    });
    builder.addCase(deleteProfile.fulfilled, state => {
      state.data = [];
    });
    builder.addCase(deleteProfile.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.data = [];
      }
    });
    builder.addCase(createFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.data = [];
      }
    });
    builder.addCase(removeFavorite.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.data = [];
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.data = [];
      }
    });
    builder.addCase(updateHashtag.rejected, (state, action) => {
      if (action.payload === 'Unauthorized') {
        state.data = [];
      }
    });
  },
});

export const {setPosts, clearPosts} = postSlice.actions;
export default postSlice.reducer;
