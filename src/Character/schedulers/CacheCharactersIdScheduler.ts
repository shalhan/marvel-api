import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GetAllCharacter } from '../interfaces';
import { CharacterIntegrationServiceWithCache } from '../services';
import { CharacterFetchingProcess } from '../services/CharacterFetchingProcess';

// scheduler to fetch all characters id every night
@Injectable()
export class CacheCharactersIdScheduler {
  constructor(
    @Inject(CharacterIntegrationServiceWithCache)
    private readonly characterService: GetAllCharacter,
  ) {}
  @Cron('30 * * * * *')
  async handleCron() {
    try {
      // only run the getAllCharactersId when there is no process running
      if (!CharacterFetchingProcess.isRunning) {
        console.log('Running the CacheCharactersIdScheduler...');
        CharacterFetchingProcess.isRunning = true;
        await this.characterService.getAllCharactersId();
        console.log('CacheCharactersIdScheduler has finished');
        CharacterFetchingProcess.isRunning = false;
      } else {
        console.warn(
          'CacheCharactersIdScheduler is still running... skip the process',
        );
        CharacterFetchingProcess.isRunning = false;
      }
    } catch (err) {
      CharacterFetchingProcess.isRunning = true;
      console.error('Error while CacheCharactersIdScheduler running', err);
    }
  }
}
