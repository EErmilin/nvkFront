import {gql} from '@apollo/client';

export const ANNOUNCEMENTS = gql`
  query Announcements {
    ads {
      id
      name
      createdAt
      price
      preview
    }
  }
`;

export const ANNOUNCEMENT = gql`
  query Announcement($adId: Int!) {
    ad(id: $adId) {
      id
      name
      content
      createdAt
      price
      url
      link_text
      images {
        id
        url_64
        url_1536
      }
    }
  }
`;
