import {createAsyncThunk} from '@reduxjs/toolkit';

import {getUpdateClient} from '../../../../requests/updateHeaders';
import {BROADCASTS} from '../../../../gql/query/broadcast/Broadcast';

import {IBroadcast} from '../../../../models/Broadcast';
import {IGetBroadcastArg} from '../../../types/BroadcastType';

export const getBroadcasts = createAsyncThunk<IBroadcast[], IGetBroadcastArg>(
  'broadcast/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: BROADCASTS,
      variables: data,
    });

    return response.data.shows as IBroadcast[];
  },
);
