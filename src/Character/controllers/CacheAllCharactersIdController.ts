import { CACHE_MANAGER, Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { CACHE_ALL_CHARACTERS_ID, FETCH_ALL_CHARACTERS_ID_EVENT } from '../constants';
import { CharacterService } from '../services';

@Controller()
export class CacheAllCharactersIdController {
  private static isRunning: boolean = false;
  constructor (
    private readonly characterService: CharacterService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  @EventPattern(FETCH_ALL_CHARACTERS_ID_EVENT)
  async handleMessagePrinted(data: Object) {
    console.log('Received event...');
    if (!CacheAllCharactersIdController.isRunning) {
      CacheAllCharactersIdController.isRunning = true;
      const result = await this.characterService.getAllCharactersId();
      console.log(result, 'resultttt');
      await this.cacheManager.set(CACHE_ALL_CHARACTERS_ID, result, {
        ttl: 86400,
      });
      console.log(await this.cacheManager.get(CACHE_ALL_CHARACTERS_ID), 'kok gaada?');
      console.log('Fetching all characters id has ended');
      CacheAllCharactersIdController.isRunning = false;
    } else {
      console.warn(`Fetching all characters id is in process... skip this event`);
    }
  }
}
