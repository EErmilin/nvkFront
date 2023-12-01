import {createAsyncThunk} from '@reduxjs/toolkit';

import {CREATE_POST} from '../../../gql/mutation/post/CreatePost';
import {ICreatePostArg} from '../../../models/Post';
import {getUpdateClient} from '../../../requests/updateHeaders';
import {RootInterface} from '../../types';
import {ApolloError} from '@apollo/client';

export const publishPost = createAsyncThunk<{id: number}, undefined>(
  'createPost/publish',
  async (_, {getState, rejectWithValue, fulfillWithValue}) => {
    try {
      const state = <RootInterface>getState();
      if (!state.user.author?.author) {
        throw new Error('Unauthorized');
      }
      const data = state.createPost;

      if (!data.title) {
        throw new Error('Title');
      }

      let client = await getUpdateClient();
      let response = await client.mutate<
        {createPost: {id: number}},
        {data: ICreatePostArg}
      >({
        mutation: CREATE_POST,
        variables: {
          data: {
            published: true,
            authorId: state.user.author.author.id,
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

      return fulfillWithValue(response.data.createPost);
    } catch (e) {
      if (e instanceof ApolloError) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue('Error');
      }
    }
  },
);
