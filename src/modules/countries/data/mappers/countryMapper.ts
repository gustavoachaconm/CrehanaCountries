import type { Country } from '../../domain/models';
import type { CountryDTO } from '../graphql/types';

export const countryMapper = {
  toDomain(dto: CountryDTO): Country {
    return {
      code: dto.code,
      name: dto.name,
      capital: dto.capital ?? null,
      currency: dto.currency ?? null,
      continent: {
        code: dto.continent.code,
        name: dto.continent.name,
      },
      languages: dto.languages.map((lang) => ({
        code: lang.code,
        name: lang.name,
      })),
    };
  },

  toDomainList(dtos: CountryDTO[]): Country[] {
    return dtos.map(this.toDomain);
  },
};
