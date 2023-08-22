import {useDispatch, useSelector} from 'react-redux';
import {TypedUseSelectorHook} from 'react-redux';

import {rootReducer} from './index';
import {store} from './persist';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
