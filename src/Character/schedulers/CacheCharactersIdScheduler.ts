import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Cache } from 'cache-manager';
import { CACHE_ALL_CHARACTERS_ID } from '../constants';
import { CharacterService } from '../services';

@Injectable()
export class CacheCharactersIdScheduler {
  private static isRunning = false;
  constructor(
    private readonly characterService: CharacterService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @Cron('0 0 24 * * *')
  async handleCron() {
    try {
      // only run the getAllCharactersId when there is no process running
      if (!CacheCharactersIdScheduler.isRunning) {
        console.log('Running the CacheCharactersIdScheduler...');
        CacheCharactersIdScheduler.isRunning = true;
        const result = await this.characterService.getAllCharactersId();
        await this.cacheManager.set(CACHE_ALL_CHARACTERS_ID, result, {
          ttl: 86400,
        });
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
