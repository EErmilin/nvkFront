import {gql} from '@apollo/client';

export const GET_SMS_CODE = gql`
  mutation GetSmsCode($phone: String!) {
    getSmsCode(phone: $phone)
  }
`;
