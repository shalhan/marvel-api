import { ApiGet } from '../../../Common/interfaces/ApiGet';
import { CharactersIdApiMapper } from '../../mappers';
import { CharacterService } from '../CharacterService';
describe('@Character.service.CharacterService', () => {
  let service: CharacterService;
  let httpServiceMock: jest.Mocked<ApiGet<any>>;
  beforeEach(() => {
    httpServiceMock = { get: jest.fn() };
    service = new CharacterService(httpServiceMock);
  });

  it('instance of CharacterService', () => {
    expect(service).toBeInstanceOf(CharacterService);
  });

  it('calls httpServiceMock.get and marvel api response mapper', async () => {
    httpServiceMock.get.mockResolvedValueOnce({
      data: { results: [{ id: 1 }] },
    });
    const mapper = jest
      .spyOn(CharactersIdApiMapper.prototype, 'map')
      .mockResolvedValueOnce([1] as never);
    await service.getCharacters();
    expect(httpServiceMock.get).toHaveBeenCalled();
    expect(mapper).toHaveBeenCalled();
  });
});
