import {gql} from '@apollo/client';

export const HOROSCOPE = gql`
  query HoroscopeSign($name: String, $date: Date) {
    horoscopeSign(name: $name, date: $date) {
      monthly {
        id
        month
        content
      }
      daily {
        id
        date
        content
      }
      weekly {
        id
        week
        content
      }
    }
  }
`;
