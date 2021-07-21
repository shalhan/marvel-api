import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GetAllCharacter } from '../interfaces';
import { CharacterIntegrationServiceWithCache } from '../services';

// scheduler to fetch all characters id every night
@Injectable()
export class CacheCharactersIdScheduler {
  public static isRunning = false;
  constructor(
    @Inject(CharacterIntegrationServiceWithCache)
    private readonly characterService: GetAllCharacter,
  ) {}
  @Cron('30 * * * * *')
  async handleCron() {
    try {
      // only run the getAllCharactersId when there is no process running
      if (!CacheCharactersIdScheduler.isRunning) {
        console.log('Running the CacheCharactersIdScheduler...');
        CacheCharactersIdScheduler.isRunning = true;
        await this.characterService.getAllCharactersId();
        console.log('CacheCharactersIdScheduler has finished');
      } else {
        console.warn(
          'CacheCharactersIdScheduler is still running... skip the process',
        );
      }
    } catch (err) {
      CacheCharactersIdScheduler.isRunning = true;
      console.error('Error while CacheCharactersIdScheduler running', err);
    }
  }
}
