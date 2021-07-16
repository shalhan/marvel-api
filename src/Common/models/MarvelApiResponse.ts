// contract of Marvel API response
// for more details: https://developer.marvel.com/docs#!/public/getCharacterIndividual_get_1

export class MarvelApiPaginationDataResult {
  id: number;
  name: string;
  description: string;
  // and more...
}

export class MarvelApiPaginationData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: MarvelApiPaginationDataResult[];
}

export class MarvelApiResponse {
  code: number;
  status: string;
  data: MarvelApiPaginationData;
}
