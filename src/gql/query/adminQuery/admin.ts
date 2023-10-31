import { gql } from "@apollo/client";

export const GET_SERIALS = gql`
  query Serials {
    serials {
      seriesSeasons {
        number
      }
      imageId
      createdAt
      updatedAt
      duration
      name
      id
    }
  }
`;

export const GET_FILMS = gql`
  query Movies {
    movies {
      createdAt
      updatedAt
      duration
      name
      id
    content
    }
  }
`;

export const GET_ANIMATIONS = gql`
query Animations {
  animations {
    id
    content
    name
    updatedAt
    createdAt
    duration
  }
}
`;

export const GET_ANIMATIONS_SEASONS = gql`
query AnimationSeasons($search: String) {
  animationSeasons(search: $search) {
    id
    createdAt
    updatedAt
    name
    number
    animationId
    animation {
      id
      name
    }
  }
}
`;

export const GET_ANIMATIONS_EPISODES = gql`
query AnimationEpisodes($skip: Int, $take: Int, $search: String) {
  animationEpisodes(skip: $skip, take: $take, search: $search) {
    id
    createdAt
    updatedAt
    name
    number
    duration
    animationSeason {
      name
      id
    }
  }
}
`;



export const GET_SERIES_SEASONS = gql`
query SeriesSeasons($search: String) {
  seriesSeasons(search: $search) {
    id
    name
    series {
      name
      id
    }
    createdAt
    updatedAt
    seriesId
  }
}
`;

export const GET_SERIES_EPISODES = gql`
query SeriesEpisodes {
  seriesEpisodes {
    id
    createdAt
    updatedAt
    name
    number
    duration
    seriesSeasonId
    series {
      name
      id
    }
  }
}
`;





