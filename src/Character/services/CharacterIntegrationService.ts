import { ApiGet } from '../../Common/interfaces/ApiGet';
import { CharactersIdApiMapper, CharacterApiMapper } from '../mappers';
import { Character } from '../models';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GetAllCharacterWithTotal, GetCharacterById } from '../interfaces/';
import {
  MarvelApiPaginationDataResult,
  MarvelApiResponse,
} from '../../Common/models';
import { MarvelIntegrationService } from '../../Common/services/MarvelIntegrationService';
import { HttpStatus } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';

// service to handle all /characters/* api
@Injectable()
export class CharacterIntegrationService
  implements GetAllCharacterWithTotal, GetCharacterById
{
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
    } while (response && response.data && response.data.count > 0);

    const ids = new CharactersIdApiMapper().map(result);
    return ids;
  }

  async getTotalCharacters(): Promise<number> {
    const limit = 1;
    const offset = 0;
    const response = await this.httpService.get('/characters', {
      offset,
      limit,
      orderBy: '-modified',
    });
    return response.data.total;
  }

  async getCharacterById(id: number): Promise<Character> {
    try {
      const response = await this.httpService.get(`/characters/${id}`);
      return new CharacterApiMapper().map(response.data.results);
    } catch (err) {
      if (err.response && err.response.status == HttpStatus.NOT_FOUND) {
        throw new NotFoundException('Cannot found character with selected id.');
      }
      throw new InternalServerErrorException();
    }
  }
}
