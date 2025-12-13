import { useEffect } from 'react';
import { apolloClient } from '../../../../core/config/apolloClient';
import { CountryRepository } from '../../data/repositories/CountryRepository';
import { useCountriesStore } from './useCountriesStore';

const countryRepository = new CountryRepository(apolloClient);

export const useCountries = () => {
  const {
    filteredCountries,
    isLoading,
    error,
    searchQuery,
    selectedContinent,
    selectedCurrency,
    setCountries,
    setLoading,
    setError,
    setSearchQuery,
    setSelectedContinent,
    setSelectedCurrency,
  } = useCountriesStore();

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const countries = await countryRepository.getAll();
      setCountries(countries);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los países');
    } finally {
      setLoading(false);
    }
  };

  return {
    countries: filteredCountries,
    isLoading,
    error,
    searchQuery,
    selectedContinent,
    selectedCurrency,
    setSearchQuery,
    setSelectedContinent,
    setSelectedCurrency,
    refetch: loadCountries,
  };
};
