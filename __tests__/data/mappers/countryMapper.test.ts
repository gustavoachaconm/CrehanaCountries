import { countryMapper } from '../../../src/modules/countries/data/mappers/countryMapper';
import type { CountryDTO } from '../../../src/modules/countries/data/graphql/types';

describe('countryMapper', () => {
  const mockDTO: CountryDTO = {
    code: 'PE',
    name: 'Peru',
    capital: 'Lima',
    currency: 'PEN',
    continent: {
      code: 'SA',
      name: 'South America',
    },
    languages: [
      { code: 'es', name: 'Spanish' },
    ],
  };

  describe('toDomain', () => {
    it('maps DTO to domain model correctly', () => {
      const result = countryMapper.toDomain(mockDTO);

      expect(result).toEqual({
        code: 'PE',
        name: 'Peru',
        capital: 'Lima',
        currency: 'PEN',
        continent: {
          code: 'SA',
          name: 'South America',
        },
        languages: [
          { code: 'es', name: 'Spanish' },
        ],
      });
    });

    it('handles multiple languages', () => {
      const dtoWithMultipleLangs: CountryDTO = {
        ...mockDTO,
        languages: [
          { code: 'es', name: 'Spanish' },
          { code: 'qu', name: 'Quechua' },
          { code: 'ay', name: 'Aymara' },
        ],
      };

      const result = countryMapper.toDomain(dtoWithMultipleLangs);

      expect(result.languages).toHaveLength(3);
      expect(result.languages[0].name).toBe('Spanish');
    });
  });

  describe('toDomainList', () => {
    it('maps array of DTOs to domain models', () => {
      const dtos: CountryDTO[] = [
        mockDTO,
        {
          ...mockDTO,
          code: 'AR',
          name: 'Argentina',
          capital: 'Buenos Aires',
          currency: 'ARS',
        },
      ];

      const result = countryMapper.toDomainList(dtos);

      expect(result).toHaveLength(2);
      expect(result[0].code).toBe('PE');
      expect(result[1].code).toBe('AR');
    });

    it('returns empty array for empty input', () => {
      const result = countryMapper.toDomainList([]);
      expect(result).toEqual([]);
    });
  });
});
