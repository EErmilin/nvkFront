import { gql } from "@apollo/client";

export const SERVICES = gql`
  query Services {
    services {
      id
      name
      preview
      createdAt
      price
      freeWords
      wordPrice
      freeImages
      imagePrice
    }
  }
`;

export const SERVICE = gql`
  query Service($serviceId: Int!) {
    service(id: $serviceId) {
      id
      name
      content
      price
      url
      link_text
      freeWords
      wordPrice
      freeImages
      imagePrice
      images {
        id
        url_64
        url_1536
      }
    }
  }
`;
