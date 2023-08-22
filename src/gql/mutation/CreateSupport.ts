import {gql} from '@apollo/client';

export const CREATE_SUPPORT = gql`
  mutation CreateSupport($createSupportInput: CreateSupportInput!) {
    createSupport(createSupportInput: $createSupportInput) {
      id
    }
  }
`;
