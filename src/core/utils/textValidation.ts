const LETTERS_ONLY_REGEX = /[^a-zA-Z\u00C0-\u024F\u1E00-\u1EFF\s]/g;

export const MAX_SEARCH_LENGTH = 50;

export const sanitizeLettersOnly = (text: string): string => {
  const cleaned = text.replace(LETTERS_ONLY_REGEX, '');
  return cleaned.slice(0, MAX_SEARCH_LENGTH);
};

export const isValidSearchInput = (text: string): boolean => {
  return text.length <= MAX_SEARCH_LENGTH && !LETTERS_ONLY_REGEX.test(text);
};
