import { gql } from '@apollo/client';

export const CREATE_VOTE = gql`
mutation CreateUserVote($createUserVoteInput: CreateUserVoteInput!) {
  createUserVote(createUserVoteInput: $createUserVoteInput) {
    id
  }
  }
`;

