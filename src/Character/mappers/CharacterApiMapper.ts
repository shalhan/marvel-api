import { Mapper } from '../../Common/interfaces/Mapper';
import { MarvelApiPaginationDataResult } from '../../Common/models';
import { Character } from '../models/Character';

export { AxiosResponse } from 'axios';

export class CharacterApiMapper
  implements Mapper<MarvelApiPaginationDataResult[], Character>
{
  map(source: MarvelApiPaginationDataResult[]): Character {
    const character = new Character();
    source.forEach((result) => {
      character.id = result.id;
      character.name = result.name;
      character.description = result.description;
    });
    return character;
  }
}
