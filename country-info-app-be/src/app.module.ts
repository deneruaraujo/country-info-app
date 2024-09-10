import { Module } from '@nestjs/common';
import { CountryService } from './services/country.service';
import { CountryController } from './controllers/country.controller';

@Module({
  imports: [],
  controllers: [CountryController],
  providers: [CountryService],
})
export class AppModule {}
