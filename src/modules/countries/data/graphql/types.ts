export interface ContinentDTO {
  code: string;
  name: string;
}

export interface LanguageDTO {
  code: string;
  name: string;
}

export interface CountryDTO {
  code: string;
  name: string;
  capital?: string;
  currency?: string;
  continent: ContinentDTO;
  languages: LanguageDTO[];
}

export interface CountriesQueryResponse {
  countries: CountryDTO[];
}

export interface CountryQueryResponse {
  country: CountryDTO | null;
}
