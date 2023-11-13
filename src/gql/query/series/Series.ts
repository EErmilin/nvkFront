import { gql } from '@apollo/client';

export const SERIALS = gql`
  query Serials(
    $take: Int
    $orderBy: SeriesOrderByWithRelationInput
    $search: String
    $where: SeriesWhereInput
  ) {
    serials(take: $take, orderBy: $orderBy, search: $search, where: $where) {
      age
      content
      createdAt
      country
      date
      duration
      genre
      id
      kinoPoisk
      kinoPoisk_url
      language
      name
      seriesSeasons {
        seriesEpisodes {
          media {
            indexM3u8Url
          }
        }
      }
      image {
        url
      }
    }
  }
`;

export const SEASONS = gql`
  query SeriesSeason($where: SeriesSeasonWhereInput) {
    seriesSeasons(where: $where) {
      id
      name
      number
      series {
        name
        duration
        country
        age
        date
        genre
        favorites {
          id
        }
        language
        kinoPoisk
        kinoPoisk_url
        id
        rating {
          id
        }
      }
      seriesId
      seriesEpisodes {
        media {
          indexM3u8Url
          id
        }
      }
    }
  }
`;

export const CURRENT_SERIAS = gql`
query Series($seriesId: Int!) {
  series(id: $seriesId) {
    id
    createdAt
    updatedAt
    name
    genre
    date
    duration
    language
    content
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
    rating {
      votes {
        comment
        user {
          firstname
        }
      }
    }
    seriesSeasons {
      name
      id
      number
      seriesEpisodes {
        media {
          indexM3u8Url
          hls {
            m3u8Url
          }
          covers {
            url_512
          }
        }
      }
    }
    image {
      url_512
      url_1536
    }
  }
}
`;

// export const SERIES = gql`
//   query Season($showId: Int!) {
//     show(id: $showId) {
//       id
//       name
//       content
//       createdAt
//       image {
//         id
//         url_256
//         url_512
//         url_1536
//         url
//       }
//       seasons {
//         id
//         showId
//         number
//         name
//         createdAt
//         episodes {
//           name
//           id
//           duration
//           number
//           seasonId
//           createdAt
//           media {
//             id
//             name
//             indexM3u8Url
//             episodeId
//             createdAt
//             hls {
//               id
//               m3u8Url
//               name
//             }
//             covers {
//               url_512
//               url_256
//               url_1536
//             }
//           }
//         }
//       }
//     }
//   }
// `;
