import {gql} from '@apollo/client';

export const POSTS = gql`
  query (
    $where: PostWhereInput
    $skip: Int
    $take: Int
    $cursor: PostWhereUniqueInput
    $orderBy: PostOrderByWithRelationInput
    $search: String
  ) {
    posts(
      where: $where
      skip: $skip
      take: $take
      cursor: $cursor
      orderBy: $orderBy
      search: $search
    ) {
      title
      published
      id
      images {
        id
        url
        url_1536
        name
        key
        date
      }
      hashtags {
        hashtag {
          id
          name
        }
      }
      views
      preview
      authorId
      author {
        id
        user {
          firstname
          lastname
        }
        nickname
        avatar {
          url_512
          url_256
          id
        }
      }
      createdAt
      updatedAt
      media {
        id
        name
        indexM3u8Url
        createdAt
        hls {
          createdAt
          id
          m3u8Url
          name
        }
        covers {
          url_512
          url_256
          url_1536
        }
      }
    }
  }
`;

export const POST = gql`
  query ($postId: Int!) {
    post(id: $postId) {
      title
      published
      id
      images {
        id
        url
        url_1536
        name
        key
        date
      }
      hashtags {
        hashtag {
          id
          name
        }
      }
      views
      content
      preview
      authorId
      author {
        id
        nickname
        user {
          firstname
          lastname
        }
        avatar {
          url_512
          url_256
          id
        }
      }
      createdAt
      updatedAt
      media {
        id
        name
        indexM3u8Url
        createdAt
        hls {
          createdAt
          id
          m3u8Url
          name
        }
        covers {
          url_512
          url_256
          url_1536
        }
      }

      totalComments
      postComments {
        createdAt
        content
        user {
          firstname
          lastname
          avatar {
            url_128
            id
          }
        }
      }
    }
  }
`;

export const POST_COMMENTS = gql`
  query postComments($postId: Int!) {
    postComments(where: {postId: $postId}, orderBy: {createdAt: desc}) {
      createdAt
      content
      user {
        firstname
        lastname
        avatar {
          id
          url_128
        }
      }
    }
  }
`;
