import {gql} from '@apollo/client';

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($changePasswordInput: ChangePasswordInput!) {
    changePassword(changePasswordInput: $changePasswordInput)
  }
`;

// export const CHANGE_PASSWORD = gql`
//   mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
//     changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
//   }
// `;
