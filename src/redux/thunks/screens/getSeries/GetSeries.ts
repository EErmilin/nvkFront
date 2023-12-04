import {createAsyncThunk} from '@reduxjs/toolkit';

import {getUpdateClient} from '../../../../requests/updateHeaders';
import {IPodcastData} from '../../../../models/Music';
import {IPodcastArg} from '../../../types/PodcastType';
import {SERIES, SERIALS, SEASONS} from '../../../../gql/query/series/Series';

export const getSeries = createAsyncThunk<IPodcastData[], IPodcastArg>(

  'series/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: SERIALS,
      variables: data,
    });
    return response.data.serials as IPodcastData[];
  },
);
//seasons
export const getSeasons = createAsyncThunk<IPodcastData[], IPodcastArg>(
  'seasons/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: SEASONS,
      variables: data,
    });
    return response.data.seriesSeasons as IPodcastData[];
  },
);
