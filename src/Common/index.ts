import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MarvelIntegrationService } from './services/MarvelIntegrationService';

@Module({
  imports: [HttpModule],
  providers: [MarvelIntegrationService],
  exports: [HttpModule, MarvelIntegrationService],
})
export class CommonModule {}
