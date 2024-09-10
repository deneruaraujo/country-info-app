import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountryService {
  private dateNagerUrl = 'https://date.nager.at/api/v3';
  private countriesNowUrl = 'https://countriesnow.space/api/v0.1/countries';

  // Fetch the available countries from Date Nager API
  async getAvailableCountries() {
    try {
      const response = await axios.get(
        `${this.dateNagerUrl}/AvailableCountries`,
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error fetching available countries',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }

  // Fetch detailed country info including borders, population, and flag
  async getCountryInfo(countryCode: string) {
    try {
      // Get country info from Date Nager API
      const countryInfoResponse = await axios.get(
        `${this.dateNagerUrl}/CountryInfo/${countryCode}`,
      );
      const borderCountries = countryInfoResponse.data.borders;

      // Get population data from CountriesNow API
      const populationResponse = await axios.post(
        `${this.countriesNowUrl}/population`,
        {
          country: countryInfoResponse.data.commonName,
        },
      );

      // Get flag URL from CountriesNow API
      const flagResponse = await axios.post(
        `${this.countriesNowUrl}/flag/images`,
        {
          country: countryInfoResponse.data.commonName,
        },
      );

      return {
        borders: borderCountries,
        population: populationResponse.data.data.populationCounts,
        flagUrl: flagResponse.data.data.flag,
      };
    } catch (error) {
      throw new HttpException(
        'Error fetching country information',
        HttpStatus.BAD_REQUEST,
        error,
      );
    }
  }
}
