import type { Country } from '../../modules/countries/domain/models';

export type RootStackParamList = {
  CountryList: undefined;
  CountryDetail: {
    country: Country;
  };
};
