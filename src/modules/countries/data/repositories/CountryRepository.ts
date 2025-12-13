import type { ApolloClient } from '@apollo/client';
import type { ICountryRepository } from '../../domain/repositories';
import type { Country } from '../../domain/models';
import type { CountriesQueryResponse, CountryQueryResponse } from '../graphql/types';
import { GET_COUNTRIES, GET_COUNTRY_BY_CODE } from '../graphql/queries';
import { countryMapper } from '../mappers/countryMapper';

export class CountryRepository implements ICountryRepository {
  constructor(private readonly apolloClient: ApolloClient) {}

  async getAll(): Promise<Country[]> {
    try {
      const { data } = await this.apolloClient.query<CountriesQueryResponse>({
        query: GET_COUNTRIES,
      });

      if (!data) {
        return [];
      }

      return countryMapper.toDomainList(data.countries);
    } catch (error) {
      throw new Error('Error de conexión. Por favor, verifica tu red.');
    }
  }

  async getByCode(code: string): Promise<Country | null> {
    const { data } = await this.apolloClient.query<CountryQueryResponse>({
      query: GET_COUNTRY_BY_CODE,
      variables: { code },
    });

    if (!data || !data.country) {
      return null;
    }

    return countryMapper.toDomain(data.country);
  }
}
