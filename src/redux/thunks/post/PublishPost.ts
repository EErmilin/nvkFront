import {createAsyncThunk} from '@reduxjs/toolkit';

import {CREATE_POST} from '../../../gql/mutation/post/CreatePost';
import {ICreatePostArg} from '../../../models/Post';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {RootInterface} from '../../types';
import {ApolloError} from '@apollo/client';

export const publishPost = createAsyncThunk<any>(
  'createPost/publish',
  async data => {
    try {

      console.log('@@@@@@@@@@@@@@@@@@@@')
      console.log(data)

      let client = await getUpdateClient();
      let response = await client.mutate<
        {createPost: {id: number}},
        {data: ICreatePostArg}
      >({
        mutation: CREATE_POST,
        variables: {
          data: {
            published: true,
            authorId: data,
            title: data.title,
            content: data.content,
            imageIds: data.images?.length
              ? data.images.map(({id}) => id)
              : undefined,
          },
        },
      });

      if (!response.data) {
        throw new Error('post not created');
      }
    } catch (e) {
    }
  },
);
