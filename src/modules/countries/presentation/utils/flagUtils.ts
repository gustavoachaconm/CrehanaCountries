export const getFlagUrl = (countryCode: string, width: number = 320): string => {
  return `https://flagcdn.com/w${width}/${countryCode.toLowerCase()}.png`;
};
