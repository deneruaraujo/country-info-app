export interface PopulationEntry {
  year: string;
  value: number;
}

export interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: null;
}

export interface CountryInfo {
  borders: BorderCountry[];
  population: PopulationEntry[];
  flagUrl: string;
}
