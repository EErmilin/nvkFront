import {createAsyncThunk} from '@reduxjs/toolkit';

import {LOGOUT} from '../../../gql/mutation/auth/Logout';
import {getUpdateClient} from '../../../requests/updateHeaders';

export const logout = createAsyncThunk<undefined, undefined>(
  'auth/logout',
  async () => {
    let client = await getUpdateClient();
    await client.mutate({
      mutation: LOGOUT,
      context: {
        headers: {
          isAuth: true,
        },
      },
    });
    return undefined;
  },
);
