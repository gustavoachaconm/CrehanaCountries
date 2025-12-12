import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      currency
      continent {
        code
        name
      }
      languages {
        code
        name
      }
    }
  }
`;

export const GET_COUNTRY_BY_CODE = gql`
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      code
      name
      capital
      currency
      continent {
        code
        name
      }
      languages {
        code
        name
      }
    }
  }
`;
