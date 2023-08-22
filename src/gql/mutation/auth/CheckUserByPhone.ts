import {gql} from '@apollo/client';

export const checkUserByPhone = gql`
  mutation CheckUserByPhone($phone: String!) {
    checkUserByPhone(phone: $phone)
  }
`;
