import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from 'src/services/country.service';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  // Endpoint to get the list of available countries
  @Get('available')
  async getAvailableCountries() {
    return this.countryService.getAvailableCountries();
  }

  // Endpoint to get detailed country info based on country code
  @Get('info/:countryCode')
  async getCountryInfo(@Param('countryCode') countryCode: string) {
    return this.countryService.getCountryInfo(countryCode);
  }
}
