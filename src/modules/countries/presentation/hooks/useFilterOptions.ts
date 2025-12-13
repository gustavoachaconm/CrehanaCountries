import { useMemo } from 'react';
import { useCountriesStore } from './useCountriesStore';

export const useFilterOptions = (selectedContinent?: string | null, selectedCurrency?: string | null) => {
  const countries = useCountriesStore((state) => state.countries);

  const continentOptions = useMemo(() => {
    const continents = new Map<string, string>();
    const filteredCountries = selectedCurrency
      ? countries.filter(country => country.currency === selectedCurrency)
      : countries;
    
    filteredCountries.forEach((country) => {
      if (!continents.has(country.continent.code)) {
        continents.set(country.continent.code, country.continent.name);
      }
    });
    return Array.from(continents.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [countries, selectedCurrency]);

  const currencyOptions = useMemo(() => {
    const currencies = new Set<string>();
    const filteredCountries = selectedContinent
      ? countries.filter(country => country.continent.code === selectedContinent)
      : countries;
    
    filteredCountries.forEach((country) => {
      if (country.currency) {
        currencies.add(country.currency);
      }
    });
    return Array.from(currencies)
      .map((currency) => ({ value: currency, label: currency }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [countries, selectedContinent]);

  return {
    continentOptions,
    currencyOptions,
  };
};
