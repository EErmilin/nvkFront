import { gql } from '@apollo/client';

export const GET_MOVIES = gql`
query Movies($take: Int) {
  movies(take: $take) {
  id
    name
    
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
    media {
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
  }
}
`;