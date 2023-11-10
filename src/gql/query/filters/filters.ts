import {gql} from '@apollo/client';

export type FilterType = 'MOVIE' | 'ANIMATION' | 'SERIES';

export type GetFilter = {
  filters: {name: string}[];
};

export type MainFilter = {
  age?: string[] | null;
  country?: string[] | null;
  genre?: string[] | null;
  language?: string[] | null;
  year?: number[] | null;
  kinopoiskRating?: {
    from?: number | null;
    to?: number | null;
  };
};

export type GetFilterVariables = {
  type: FilterType;
};

export const GET_FILTER_GENRE = gql`
  query getFilterGenre($type: FilterType!) {
    filters: filterGenre(type: $type) {
      name
    }
  }
`;

export const GET_FILTER_COUNTRY = gql`
  query getFilterGenre($type: FilterType!) {
    filters: filterCountry(type: $type) {
      name
    }
  }
`;

export const GET_FILTER_LANGUAGE = gql`
  query filterLanguage($type: FilterType!) {
    filters: filterCountry(type: $type) {
      name
    }
  }
`;
