import { ApiGet } from '../../Common/interfaces/ApiGet';
import { CharactersIdApiMapper } from '../mappers';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { MarvelApiPaginationDataResult, MarvelApiResponse } from '../../Common/models';
import { MarvelIntegrationService } from '../../Common/services/MarvelIntegrationService';
import { Cache } from 'cache-manager';
import { CACHE_ALL_CHARACTERS_ID, FETCH_ALL_CHARACTERS_ID_CLIENT, FETCH_ALL_CHARACTERS_ID_EVENT } from '../constants';
import { ServiceUnavailableException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CharacterService {
  constructor(
    @Inject(MarvelIntegrationService)
    private readonly httpService: ApiGet<MarvelApiResponse>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(FETCH_ALL_CHARACTERS_ID_CLIENT) private client: ClientProxy,
  ) {}
  async getCharacters(): Promise<number[]> {
    const ids: number[] = await this.cacheManager.get(CACHE_ALL_CHARACTERS_ID);
    if (!ids || ids.length == 0) {
      const payload = {};
      console.log(`Sending event to ${FETCH_ALL_CHARACTERS_ID_EVENT} with empty payload...`);
      this.client.emit<number>(FETCH_ALL_CHARACTERS_ID_EVENT, payload).toPromise();
      throw new ServiceUnavailableException('Service unavailable. Please try again in a few minutes');
    }
    return ids;
  }

  // no retry mechanism
  // when there is a failure, all process will be failed 
  async getAllCharactersId(): Promise<number[]> {
    const limit = 100;
    let offset = 0;
    let result: MarvelApiPaginationDataResult[] = [];
    let response;
    do {
      response = await this.httpService.get('/characters', { offset, limit, orderBy: '-modified' });
      if (response && response.data && response.data.count > 0) {
        result.push(...response.data.results);
        offset += limit;
      }
    } while (response && response.data && response.data.count > 200)

    const ids = new CharactersIdApiMapper().map(result);
    return ids;
  }
}
