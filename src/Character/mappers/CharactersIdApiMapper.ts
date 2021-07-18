import { Mapper } from '../../Common/interfaces/Mapper';
import { MarvelApiPaginationDataResult } from '../../Common/models';

export { AxiosResponse } from 'axios';

export class CharactersIdApiMapper
  implements Mapper<MarvelApiPaginationDataResult[], number[]>
{
  map(source: MarvelApiPaginationDataResult[]): number[] {
    const ids: number[] = [];
    source.forEach((result) => {
      ids.push(result.id);
    });
    return ids;
  }
}
