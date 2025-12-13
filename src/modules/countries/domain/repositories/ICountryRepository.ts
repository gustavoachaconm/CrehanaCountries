import type { Country } from '../models';

export interface ICountryRepository {
  getAll(): Promise<Country[]>;
  getByCode(code: string): Promise<Country | null>;
}
