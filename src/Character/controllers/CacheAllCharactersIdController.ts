import { CACHE_MANAGER, Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import {
  CACHE_ALL_CHARACTERS_ID,
  FETCH_ALL_CHARACTERS_ID_EVENT,
} from '../constants';
import { GetAllCharacter } from '../interfaces';
import { CharacterIntegrationServiceWithCache } from '../services';
import { CharacterFetchingProcess } from '../services/CharacterFetchingProcess';

// consume message from event: fetch-all-characters-id-event
@Controller()
export class CacheAllCharactersIdController {
  constructor(
    @Inject(CharacterIntegrationServiceWithCache)
    private readonly characterService: GetAllCharacter,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @EventPattern(FETCH_ALL_CHARACTERS_ID_EVENT)
  async handleMessagePrinted() {
    console.log(`Received event... ${CharacterFetchingProcess.isRunning}`);
    try {
      if (!CharacterFetchingProcess.isRunning) {
        CharacterFetchingProcess.isRunning = true;
        const result = await this.characterService.getAllCharactersId();
        await this.cacheManager.set(CACHE_ALL_CHARACTERS_ID, result, {
          ttl: 86400,
        });
        console.log('Fetching all characters id has ended');
        CharacterFetchingProcess.isRunning = false;
      } else {
        console.warn(
          `[Listener] Fetching all characters id is in process... skip this event`,
        );
      }
    } catch (err) {
      CharacterFetchingProcess.isRunning = false;
      console.error(`Error while running the scheduler`, err);
    }
  }
}
