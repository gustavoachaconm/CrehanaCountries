export interface Country {
  code: string;
  name: string;
  capital: string | null;
  currency: string | null;
  continent: {
    code: string;
    name: string;
  };
  languages: Array<{
    code: string;
    name: string;
  }>;
}
