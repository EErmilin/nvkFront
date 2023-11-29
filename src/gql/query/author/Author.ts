import {gql} from '@apollo/client';

export const AUTHOR = gql`
  query GetAuthor($id: Int!, $userId: Int) {
    authorAggregate(authorId: $id) {
      subsCount
      postsCount
      followsCount
    }
    authorIsSubscribe(authorId: $id, userId: $userId) {
      isSubscribe
    }
    author(id: $id) {
      id
      nickname
      avatar {
        url: url_512
      }
      description
      vk
      telegram
      odnoklassniki
      youtube
      websites

      posts {
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
  }
`;

export const ME_AUTHOR = gql`
  query GetAuthor($id: Int!) {
    authorAggregate(authorId: $id) {
      subsCount
      postsCount
      followsCount
    }
    author(id: $id) {
      id
      nickname
      avatar {
        url: url_512
      }
      description
      vk
      telegram
      odnoklassniki
      youtube
      websites
    }
  }
`;

export const AUTHOR_SUBSCRIBE = gql`
  mutation Subscribe($authorId: Int!, $userId: Int!, $isSubscribe: Boolean!) {
    authorSubscribe(
      authorId: $authorId
      userId: $userId
      isSubscribe: $isSubscribe
    ) {
      isSubscribe
    }
  }
`;

export const AUTHOR_SUBSCRIPTIONS = gql`
  query GetSubscriptions($userId: Int!) {
    items: authorSubscriptions(userId: $userId) {
      id
      nickname
      avatar {
        url: url_512
      }
    }
  }
`;

export const AUTHOR_CREATE = gql`
  mutation AuthorCreate($data: CreateAuthorInput!) {
    item: createAuthor(createAuthorInput: $data) {
      id
    }
  }
`;

export const AUTHOR_UPDATE = gql`
  mutation AuthorUpdate($data: UpdateAuthorInput!) {
    item: updateAuthor(updateAuthorInput: $data) {
      id
    }
  }
`;
