import {createAsyncThunk} from '@reduxjs/toolkit';

import {getUpdateClient} from '../../../../requests/updateHeaders';
import {IPodcastData} from '../../../../models/Music';
import {PODCASTS} from '../../../../gql/query/podcast/Podcast';
import {IPodcastArg} from '../../../types/PodcastType';
import { GET_MOVIE, GET_MOVIES } from '../../../../gql/query/films/films';
import { IBroadcast } from '../../../../models/Broadcast';
import { IGetBroadcastArg } from '../../../types/BroadcastType';

export const getFilms = createAsyncThunk<any[], any>(
  'movies/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: GET_MOVIES,
      variables: data,
    });
    return response.data.movies as any[];
  },
);

export const getFilm = createAsyncThunk<any[], any>(
  'movie/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: GET_MOVIE,
      variables: data,
    });
    return response.data.movie as any[];
  },
);

