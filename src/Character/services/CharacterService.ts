import { Cache } from 'cache-manager';
import { ClientProxy } from '@nestjs/microservices';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import {
  CACHE_ALL_CHARACTERS_ID,
  FETCH_ALL_CHARACTERS_ID_CLIENT,
  FETCH_ALL_CHARACTERS_ID_EVENT,
} from '../constants';
import { GetAllCharacter } from '../interfaces/';
import { ServiceUnavailableException } from '@nestjs/common';

// service that will communicate with local db
// currently using redis as a cache manager
@Injectable()
export class CharacterService implements GetAllCharacter {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(FETCH_ALL_CHARACTERS_ID_CLIENT) private client: ClientProxy,
  ) {}
  async getAllCharactersId(): Promise<number[]> {
    const ids: number[] = await this.cacheManager.get(CACHE_ALL_CHARACTERS_ID);
    if (!ids || ids.length == 0) {
      const payload = {};
      console.log(
        `Sending event to ${FETCH_ALL_CHARACTERS_ID_EVENT} with empty payload...`,
      );
      this.client
        .emit<number>(FETCH_ALL_CHARACTERS_ID_EVENT, payload)
        .toPromise();
      throw new ServiceUnavailableException(
        'Service unavailable. Please try again in a few minutes',
      );
    }
    return ids;
  }
}
