import {gql} from '@apollo/client';

export const HASHTAG = gql`
  query Hashtags($hashtagId: Int!) {
    hashtag(id: $hashtagId) {
      id
      name
      posts {
        post {
          id
          authorId
          content
          preview
          title
          published
          images {
            id
            url
            url_1536
          }
          author {
            firstname
            lastname
            avatar {
              url_512
              id
            }
          }
          views
          createdAt
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
    }
  }
`;

export const HASHTAG_POSTS = gql`
  query GetHashtags($search: String) {
    hashtags(search: $search) {
      id
      name
      posts {
        postId
      }
    }
  }
`;

export const HASHTAG_WITH_POSTS = gql`
  query GetHashtags($where: HashtagWhereInput) {
    hashtags(where: $where) {
      id
      name
      posts {
        post {
          title
          published
          views
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
          content
          authorId
          author {
            id
            firstname
            lastname
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;
