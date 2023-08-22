import {createAsyncThunk} from '@reduxjs/toolkit';

import {getUpdateClient} from '../../../../requests/updateHeaders';
import {IPodcastData} from '../../../../models/Music';
import {PODCASTS} from '../../../../gql/query/podcast/Podcast';
import {IPodcastArg} from '../../../types/PodcastType';

export const getFilms = createAsyncThunk<IPodcastData[], IPodcastArg>(
  'podcast/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: PODCASTS,
      variables: data,
    });
    return response.data.podcasts as IPodcastData[];
  },
);
