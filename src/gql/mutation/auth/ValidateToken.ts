import {gql} from '@apollo/client';

export const VALIDATE_TOKEN = gql`
  mutation ValidateToken($userId: Int!, $token: String!) {
    validateToken(userId: $userId, token: $token)
  }
`;
