import {gql} from '@apollo/client';

export const RADIO = gql`
  query RadioOne($radioId: Int!) {
    radio(id: $radioId) {
      id
      name
      url
      cover
      programs {
        id
        name
        startTime
        endTime
        date
      }
    }
  }
`;

export const RADIO_PROGRAM = gql`
  query Programs(
    $where: RadioProgramWhereInput
    $orderBy: RadioProgramOrderByWithAggregationInput
  ) {
    programs(where: $where, orderBy: $orderBy) {
      id
      name
      date
      startTime
      endTime
    }
  }
`;
