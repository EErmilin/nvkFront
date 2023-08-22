import {gql} from '@apollo/client';

export const VALIDATE_SMS_CODE = gql`
  mutation ValidateSmsCode($phone: String!, $code: String!) {
    validateSmsCode(phone: $phone, code: $code)
  }
`;
