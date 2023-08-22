import {createAsyncThunk} from '@reduxjs/toolkit';

import {apolloClient} from '../../../apolloClient';
import {LOGIN} from '../../../gql/mutation/auth/Login';
import {IUser} from '../../../models/User';
import {ILoginInput} from '../../types/AuthTypes';

export interface ResponseLogin {
  user: IUser;
  accessToken: string;
}

export const loginUser = createAsyncThunk<ResponseLogin, ILoginInput>(
  'auth/login',
  async data => {
    let response = await apolloClient.mutate({
      mutation: LOGIN,
      variables: {
        loginInput: data,
      },
    });
    return response.data.login as ResponseLogin;
  },
);
