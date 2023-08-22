import {gql} from '@apollo/client';

export const RADIOS = gql`
  query Radio {
    radios {
      name
      id
      programs {
        startTime
        radioId
        radio {
          id
          name
        }
        name
        id
        endTime
        date
      }
    }
  }
`;
