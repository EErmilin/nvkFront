import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query Movies(
    $take: Int
    $search: String
    $where: MovieWhereInput
    $orderBy: MovieOrderByWithRelationInput
  ) {
    movies(take: $take, search: $search, where: $where, orderBy: $orderBy) {
      id
      name
      price
      image {
        url
      }
      rating {
        id
        createdAt
        updatedAt
        showId
        animationId
        movieId
        seriesId
      }
    }
  }
`;

export const GET_MOVIE = gql`
  query Movie($movieId: Int!) {
    movie(id: $movieId) {
      id
      ratingNvk
      ratingKinopoisk
      userVote {
        comment
        vote
        id
        user {
          avatar {
            url
            url_64
            url_128
            url_256
          }
          firstname
          lastname
        }
        createdAt
        updatedAt
      }
      name
      content
      price
      media {
        id
        indexM3u8Url
        hls {
          m3u8Url
        }
      }
      kinoPoisk_url
      kinoPoisk
      age
      language
      country
      date
      genre
      duration
      views
      image {
        url_1536
      }
    }
    movieAccess(movieId: $movieId)
  }
`;

export const MARK_MOVIE_VIEWED = gql`
  mutation MovieViewed($id: Int!) {
    markMoviesAsViewed(id: $id)
  }
`;

export const MOVIE_IS_VIEWED = gql`
  query MovieIsViewed($id: Int!) {
    movieIsViewed(id: $id)
  }
`;
