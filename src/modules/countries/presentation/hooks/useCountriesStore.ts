import { create } from 'zustand';
import type { Country } from '../../domain/models';

interface CountriesState {
  countries: Country[];
  filteredCountries: Country[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedContinent: string | null;
  selectedCurrency: string | null;
  
  setCountries: (countries: Country[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedContinent: (continent: string | null) => void;
  setSelectedCurrency: (currency: string | null) => void;
  applyFilters: () => void;
}

export const useCountriesStore = create<CountriesState>((set, get) => ({
  countries: [],
  filteredCountries: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedContinent: null,
  selectedCurrency: null,

  setCountries: (countries) => {
    set({ countries });
    get().applyFilters();
  },

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setSelectedContinent: (continent) => {
    set({ selectedContinent: continent });
    get().applyFilters();
  },

  setSelectedCurrency: (currency) => {
    set({ selectedCurrency: currency });
    get().applyFilters();
  },

  applyFilters: () => {
    const { countries, searchQuery, selectedContinent, selectedCurrency } = get();
    
    let filtered = countries;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query)
      );
    }

    if (selectedContinent) {
      filtered = filtered.filter(
        (country) => country.continent.code === selectedContinent
      );
    }

    if (selectedCurrency) {
      filtered = filtered.filter(
        (country) => country.currency?.includes(selectedCurrency)
      );
    }

    set({ filteredCountries: filtered });
  },
}));
