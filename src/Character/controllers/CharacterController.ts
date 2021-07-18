import * as api from '@nestjs/common';
import * as constants from '../constants';
import * as swagger from '@nestjs/swagger';

import { API_V1 } from '../../Common/constants';
import { ApiSuccessResponse } from '../../Common/models';
import { CharacterService } from '../services/CharacterService';
import { HttpStatus } from '@nestjs/common';
import { ServiceUnavailableException } from '@nestjs/common';

type GetCharactersResponse = Promise<ApiSuccessResponse<number[]>>;

@api.Controller(API_V1)
@swagger.ApiTags('Character')
export class CharacterController {
  constructor(private readonly service: CharacterService) {}
  @api.Get('/characters')
  @swagger.ApiOperation({ description: constants.GET_CHARACTERS_API_TITLE })
  @swagger.ApiOkResponse({
    type: ApiSuccessResponse,
    description: constants.GET_CHARACTERS_API_SUCCESS_MESSAGE,
  })
  @swagger.ApiServiceUnavailableResponse({ description: 'Characters id are not available at the moment. Make sure to run the scheduler'})
  async getCharacters(): GetCharactersResponse {
    const data = await this.service.getCharacters();
    return new ApiSuccessResponse(
      HttpStatus.OK,
      constants.GET_CHARACTERS_API_SUCCESS_MESSAGE,
      data,
    );
  }
}
