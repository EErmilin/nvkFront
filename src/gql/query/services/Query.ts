import {gql} from '@apollo/client';

export const QUERY_SERVICES = gql`
  query SERVICES {
    ads {
      id
      name
      preview
      createdAt
      price
      images {
        id
        url_64
        url_1536
      }
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
      images {
        id
        url_64
        url_1536
      }
    }
  }
`;
