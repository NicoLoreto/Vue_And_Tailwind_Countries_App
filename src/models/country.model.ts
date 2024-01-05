export interface ICountry {
  name: {
    common: string;
  };
  capital: string[];
  cca3: string;
  flags: {
    alt: string;
    png: string;
    svg: string;
  };
  population: number;
  region: string;
}
