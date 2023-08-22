import {createAsyncThunk} from '@reduxjs/toolkit';

import {POSTS} from '../../../gql/query/posts/Post';
import {IPost} from '../../../models/Post';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {IGetPostArg} from '../../types/PostTypes';

export const getPosts = createAsyncThunk<IPost[], IGetPostArg>(
  'post/fetch',
  async data => {
    let client = await getUpdateClient();
    let response = await client.query({
      query: POSTS,
      variables: data,
    });
    return response.data.posts as IPost[];
  },
);
