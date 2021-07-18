import * as api from '@nestjs/common';
import * as constants from '../constants';
import * as swagger from '@nestjs/swagger';

import { API_V1 } from '../../Common/constants';
import { ApiSuccessResponse } from '../../Common/models';
import { CharacterService } from '../services/CharacterService';
import { HttpStatus, Inject, Param } from '@nestjs/common';
import { GetAllCharacter, GetCharacterById } from '../interfaces';
import { CharacterIntegrationService } from '../services';
import { Character } from '../models';

type GetCharactersResponse = Promise<ApiSuccessResponse<number[]>>;
type GetCharacterByIdResponse = Promise<ApiSuccessResponse<Character>>;

@api.Controller(API_V1)
@swagger.ApiTags('Character')
export class CharacterController {
  constructor(
    @Inject(CharacterService)
    private readonly characterService: GetAllCharacter,
    @Inject(CharacterIntegrationService)
    private readonly characterIntegration: GetCharacterById,
  ) {}
  @api.Get('/characters')
  @swagger.ApiOperation({ description: constants.GET_CHARACTERS_API_TITLE })
  @swagger.ApiOkResponse({
    type: ApiSuccessResponse,
    description: constants.GET_CHARACTERS_API_SUCCESS_MESSAGE,
  })
  @swagger.ApiServiceUnavailableResponse({
    description:
      'Characters id are not available at the moment. Please try again in a few minutes.',
  })
  async getCharacters(): GetCharactersResponse {
    const data = await this.characterService.getAllCharactersId();
    return new ApiSuccessResponse(
      HttpStatus.OK,
      constants.GET_CHARACTERS_API_SUCCESS_MESSAGE,
      data,
    );
  }

  @api.Get('/characters/:id')
  @swagger.ApiOperation({ description: constants.GET_CHARACTERS_API_TITLE })
  @swagger.ApiOkResponse({
    type: ApiSuccessResponse,
    description: constants.GET_CHARACTERS_API_SUCCESS_MESSAGE,
  })
  @swagger.ApiNotFoundResponse({
    description: 'Cannot found character with selected id.',
  })
  async getCharacterById(@Param('id') id: number): GetCharacterByIdResponse {
    const data = await this.characterIntegration.getCharacterById(id);
    return new ApiSuccessResponse<Character>(
      HttpStatus.OK,
      constants.GET_CHARACTER_BY_ID_API_SUCCESS_MESSAGE,
      data,
    );
  }
}
