import {gql} from '@apollo/client';

export const QUERY_SERVICES = gql`
  query SERVICES {
    ads {
      id
      name
      preview
      createdAt
      price
    }
    coupons {
      id
      name
      createdAt
      price
      preview
    }
    services {
      id
      name
      preview
      createdAt
      price
    }
  }
`;
