import {gql} from '@apollo/client';

export const TERMS = gql`
  query Terms {
    terms {
      id
      name
    }
  }
`;

export const TERM = gql`
  query Term($id: Int!) {
    term(id: $id) {
      id
      name
      content
    }
  }
`;
