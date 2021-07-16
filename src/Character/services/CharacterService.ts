import { ApiGet } from '../../Common/interfaces/ApiGet';
import { CharactersIdApiMapper } from '../mappers';
import { Inject, Injectable } from '@nestjs/common';
import { MarvelApiResponse } from '../../Common/models';
import { MarvelIntegrationService } from '../../Common/services/MarvelIntegrationService';

@Injectable()
export class CharacterService {
  constructor(
    @Inject(MarvelIntegrationService)
    private readonly httpService: ApiGet<MarvelApiResponse>,
  ) {}
  async getCharacters(): Promise<number[]> {
    const response = await this.httpService.get('/characters');
    const ids = new CharactersIdApiMapper().map(response);
    return ids;
  }
}
