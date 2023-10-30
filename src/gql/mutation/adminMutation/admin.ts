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
