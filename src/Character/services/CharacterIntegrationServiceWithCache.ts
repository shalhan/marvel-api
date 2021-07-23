import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CACHE_ALL_CHARACTERS_ID } from '../constants';
import { GetAllCharacter, GetAllCharacterWithTotal } from '../interfaces';
import { CharacterIntegrationService } from './CharacterIntegrationService';

// dependency with CharacterIntegrationService
// to handle cache mechanism of CharacterIntegrationService
@Injectable()
export class CharacterIntegrationServiceWithCache implements GetAllCharacter {
  constructor(
    @Inject(CharacterIntegrationService)
    private readonly service: GetAllCharacterWithTotal,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  // no retry mechanism
  // when there is a failure, all process will be failed
  async getAllCharactersId(): Promise<number[]> {
    console.log(`Fetching all characters id...`);
    const totalCharacters = await this.service.getTotalCharacters();
    let ids: number[] = await this.cacheManager.get(CACHE_ALL_CHARACTERS_ID);
    if (!ids || ids.length !== totalCharacters) {
      ids = await this.service.getAllCharactersId();
      console.log(`Store all characters id to cache manager`, ids);
      await this.cacheManager.set(CACHE_ALL_CHARACTERS_ID, ids, {
        ttl: 86400,
      });
      console.log(`Store success...`);
    } else {
      console.log(`All characters id already exist... skip process`);
    }
    return ids;
  }
}
