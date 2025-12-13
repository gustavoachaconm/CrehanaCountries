import { useEffect } from 'react';
import { useCountriesStore } from './useCountriesStore';
import { strings } from '../../../../core/config/i18n';
import { useDebounce } from '../../../../core/hooks/useDebounce';
import { countryRepository } from '../../di/dependencies';

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
    setDebouncedSearchQuery,
    setSelectedContinent,
    setSelectedCurrency,
  } = useCountriesStore();

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    setDebouncedSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setDebouncedSearchQuery]);

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
      setError(err instanceof Error ? err.message : strings.countries.loadError);
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
