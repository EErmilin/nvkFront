import {createAsyncThunk} from '@reduxjs/toolkit';

import {REGISTER} from '../../../gql/mutation/auth/Register';
import {IUser} from '../../../models/User';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {ISignUpInput} from '../../types/UserTypes';

interface ResponseRegister {
  user: IUser;
  accessToken: string;
}

export const createUser = createAsyncThunk<ResponseRegister, ISignUpInput>(
  'user/create',
  async data => {
    let client = await getUpdateClient();
    let response = await client.mutate({
      mutation: REGISTER,
      variables: {
        signUpInput: data,
      },
    });
    return response.data.register as ResponseRegister;
  },
);
