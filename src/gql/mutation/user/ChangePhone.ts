import {gql} from '@apollo/client';

export const CHANGE_PHONE = gql`
  mutation ChangePhone($changePhoneInput: ChangePhoneInput!) {
    changePhone(changePhoneInput: $changePhoneInput)
  }
`;
