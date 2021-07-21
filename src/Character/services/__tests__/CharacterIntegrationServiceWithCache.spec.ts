import { Cache } from 'cache-manager';
import { CharacterIntegrationService } from '../CharacterIntegrationService';
import { CharacterIntegrationServiceWithCache } from '../CharacterIntegrationServiceWithCache';

describe('@character.service.CharacterIntegrationServiceWithCache', () => {
  let service: CharacterIntegrationServiceWithCache;
  let mockService: jest.Mocked<CharacterIntegrationService>;
  let mockCache: jest.Mocked<Cache>;
  beforeEach(() => {
    mockService = { getAllCharactersId: jest.fn() } as any;
    mockCache = { set: jest.fn(), get: jest.fn() } as any;
    service = new CharacterIntegrationServiceWithCache(mockService, mockCache);
  });
  describe('getAllCharactersId()', () => {
    it('calls mockService.get and mockCache once', async () => {
      mockService.getAllCharactersId.mockResolvedValueOnce([1, 2, 3]);
      await service.getAllCharactersId();
      expect(mockService.getAllCharactersId).toHaveBeenCalledTimes(1);
      expect(mockCache.set).toHaveBeenCalledTimes(1);
    });
  });
});
