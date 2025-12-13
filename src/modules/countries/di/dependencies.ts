import { apolloClient } from '../../../core/config/apolloClient';
import { CountryRepository } from '../data/repositories/CountryRepository';

export const countryRepository = new CountryRepository(apolloClient);
