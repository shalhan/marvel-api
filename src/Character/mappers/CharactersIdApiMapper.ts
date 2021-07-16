import { Mapper } from '../../Common/interfaces/Mapper';
import { MarvelApiResponse } from '../../Common/models';

export { AxiosResponse } from 'axios';

export class CharactersIdApiMapper
  implements Mapper<MarvelApiResponse, number[]>
{
  map(source: MarvelApiResponse): number[] {
    const ids: number[] = [];
    source.data.results.forEach((result) => {
      ids.push(result.id);
    });
    return ids;
  }
}
