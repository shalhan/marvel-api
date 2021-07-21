import { ClientProxy } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { CharacterService } from '../CharacterService';

describe('@character.service.CharacterService', () => {
  let service: CharacterService;
  let mockCache: jest.Mocked<Cache>;
  let mockClient: jest.Mocked<ClientProxy>;
  beforeEach(() => {
    mockCache = { set: jest.fn(), get: jest.fn() } as any;
    mockClient = {
      emit: () => ({ toPromise: () => jest.fn() } as any),
    } as any;
    service = new CharacterService(mockCache, mockClient);
  });
  describe('getAllCharactersId()', () => {
    it('calls mockCache.get and throw error if empty', async () => {
      mockCache.get.mockResolvedValueOnce(undefined);
      try {
        await service.getAllCharactersId();
        expect(1).toBe(2);
      } catch (err) {
        expect(err).toMatchInlineSnapshot(
          `[ServiceUnavailableException: Service unavailable. Please try again in a few minutes]`,
        );
      }
    });
  });
});
