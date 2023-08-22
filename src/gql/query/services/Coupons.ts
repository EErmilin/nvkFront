import {gql} from '@apollo/client';

export const COUPONS = gql`
  query Coupons {
    coupons {
      url
      price
      name
      link_text
      images {
        url_64
        id
        name
      }
      id
      content
    }
  }
`;

export const COUPON = gql`
  query Coupon($couponId: Int!) {
    coupon(id: couponId) {
      id
      name
      content
      createdAt
      price
      url
      preview
      link_text
      images {
        id
        url_64
      }
    }
  }
`;
