import { gql } from "@apollo/client";

export const CREATE_IMAGE = gql`
  mutation CreateImage($createImageInput: CreateImageInput!) {
    createImage(createImageInput: $createImageInput) {
      id
      key
      name
      url
    }
  }
`;

export const CREATE_MEDIA = gql`
  mutation CreateMedia($createMediaInput: CreateMediaInput!) {
    createMedia(createMediaInput: $createMediaInput) {
      id
    }
  }
`;

export const CREATE_MOVIE = gql`
  mutation CreateMovie($createMovieInput: CreateMovieInput!) {
    createMovie(createMovieInput: $createMovieInput) {
      imageId
      media {
        id
      }
      content
      id
      name
    }
  }
`;

export const CREATE_SERIES = gql`
  mutation CreateSeries($createSeriesInput: CreateSeriesInput!) {
    createSeries(createSeriesInput: $createSeriesInput) {
      id
    }
  }
`;

export const CREATE_SEASONS = gql`
  mutation CreateSeriesSeason(
    $createSeriesSeasonInput: CreateSeriesSeasonInput!
  ) {
    createSeriesSeason(createSeriesSeasonInput: $createSeriesSeasonInput) {
      id
    }
  }
`;

export const CREATE_EPISODS = gql`
  mutation CreateSeriesEpisode(
    $createSeriesEpisodeInput: CreateSeriesEpisodeInput!
  ) {
    createSeriesEpisode(createSeriesEpisodeInput: $createSeriesEpisodeInput) {
      id
    }
  }
`;



export const CREATE_ANIMATION = gql`
mutation CreateAnimation($createAnimationInput: CreateAnimationInput!) {
  createAnimation(createAnimationInput: $createAnimationInput) {
    id
  }
}
`;

export const CREATE_ANIMATION_SEASONS = gql`
mutation CreateAnimationSeason($createAnimationSeasonInput: CreateAnimationSeasonInput!) {
  createAnimationSeason(createAnimationSeasonInput: $createAnimationSeasonInput) {
    id
  }
}
`;

export const CREATE_ANIMATION_EPISODS = gql`
mutation CreateAnimationEpisode($createAnimationEpisodeInput: CreateAnimationEpisodeInput!) {
  createAnimationEpisode(createAnimationEpisodeInput: $createAnimationEpisodeInput) {
    id
  }
}
`;

