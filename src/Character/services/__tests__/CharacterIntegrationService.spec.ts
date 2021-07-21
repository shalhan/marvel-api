import { MarvelIntegrationService } from 'src/Common/services';
import { CharacterIntegrationService } from '../CharacterIntegrationService';

describe('@character.service.CharacterIntegrationService', () => {
  let service: CharacterIntegrationService;
  let httpService: jest.Mocked<MarvelIntegrationService>;
  beforeEach(() => {
    httpService = { get: jest.fn() } as any;
    service = new CharacterIntegrationService(httpService);
  });
  describe('getAllCharactersId()', () => {
    it('calls httpService.get twice', async () => {
      httpService.get
        .mockResolvedValueOnce({
          data: {
            count: 10,
            results: [
              {
                id: 1,
                name: 'hero',
                description: 'description',
              } as any,
            ],
          } as any,
        } as any)
        .mockResolvedValueOnce({
          data: {
            count: 0,
            results: [],
          } as any,
        } as any);

      await service.getAllCharactersId();
      expect(httpService.get).toHaveBeenCalledTimes(2);
    });
  });

  describe('getCharacterById()', () => {
    it('calls httpService.get once', async () => {
      httpService.get.mockResolvedValueOnce({
        data: {
          count: 10,
          results: [
            {
              id: 1,
              name: 'hero',
              description: 'description',
            } as any,
          ],
        } as any,
      } as any);

      const response = await service.getCharacterById(1);
      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(response.id).toBe(1);
      expect(response.name).toBe('hero');
      expect(response.description).toBe('description');
    });

    it('throw error if character not found', async () => {
      httpService.get.mockImplementationOnce(() => {
        throw {
          response: {
            status: 404,
          },
        };
      });
      try {
        await service.getCharacterById(1);
        expect(1).toBe(2);
      } catch (err) {
        expect(err.response.statusCode).toBe(404);
      }
    });
  });
});
