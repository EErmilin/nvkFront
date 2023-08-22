import {createAsyncThunk} from '@reduxjs/toolkit';

import {getUpdateClient} from '../../../../requests/updateHeaders';
import {MUSIC} from '../../../../gql/query/music/Music';
import {IMusicData} from '../../../../models/Music';
import {IGetMusicArg} from '../../../types/MusicType';

export const getMusics = createAsyncThunk<IMusicData | null, IGetMusicArg>(
  'musics/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: MUSIC,
      variables: data,
    });
    return response.data.musics as IMusicData;
  },
);
