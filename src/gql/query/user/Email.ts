import {gql} from '@apollo/client';

export const CHECK_EMAIL = gql`
  query Query($email: String!) {
    checkEmail(email: $email)
  }
`;
