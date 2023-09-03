import {combineReducers} from 'redux';

import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import postSlice from './slices/postSlice';
import mainSlice from './slices/mainSlice';
import favoriteSlice from './slices/favoriteSlice';
import screensSlice from './slices/screensSlice';
import routerSlice from './slices/routerSlice';

export const reducersObj = {
  router: routerSlice,
  auth: authSlice,
  user: userSlice,
  post: postSlice,
  main: mainSlice,
  favorite: favoriteSlice,
  screens: screensSlice,
};

export const rootReducer = combineReducers(reducersObj);
