import { ApiGet } from '../../Common/interfaces/ApiGet';
import { CharactersIdApiMapper } from '../mappers';
import { Inject, Injectable } from '@nestjs/common';
import { GetAllCharacter } from '../interfaces/';
import {
  MarvelApiPaginationDataResult,
  MarvelApiResponse,
} from '../../Common/models';
import { MarvelIntegrationService } from '../../Common/services/MarvelIntegrationService';

// service to handle all /characters/* api
@Injectable()
export class CharacterIntegrationService implements GetAllCharacter {
  constructor(
    @Inject(MarvelIntegrationService)
    private readonly httpService: ApiGet<MarvelApiResponse>,
  ) {}
  // no retry mechanism
  // when there is a failure, all process will be failed
  async getAllCharactersId(): Promise<number[]> {
    const limit = 100;
    let offset = 0;
    const result: MarvelApiPaginationDataResult[] = [];
    let response;
    do {
      response = await this.httpService.get('/characters', {
        offset,
        limit,
        orderBy: '-modified',
      });
      if (response && response.data && response.data.count > 0) {
        result.push(...response.data.results);
        offset += limit;
      }
    } while (response && response.data && response.data.count > 200);

    const ids = new CharactersIdApiMapper().map(result);
    return ids;
  }
}