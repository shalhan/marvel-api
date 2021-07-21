import { CharacterIntegrationServiceWithCache } from 'src/Character/services';
import { CacheCharactersIdScheduler } from '../CacheCharactersIdScheduler';

describe('@character.scheduler.CacheCharactersIdScheduler', () => {
  let service: CacheCharactersIdScheduler;
  let mockService: jest.Mocked<CharacterIntegrationServiceWithCache>;
  beforeEach(() => {
    mockService = { getAllCharactersId: jest.fn() } as any;
    service = new CacheCharactersIdScheduler(mockService);
  });
  it('calls mockService.getAllCharactersId once', async () => {
    await service.handleCron();
    expect(mockService.getAllCharactersId).toHaveBeenCalledTimes(1);
  });

  it('calls mockService.getAllCharactersId once even if there is multiple process', async () => {
    await service.handleCron();
    CacheCharactersIdScheduler.isRunning = true;
    await service.handleCron();
    expect(mockService.getAllCharactersId).not.toHaveBeenCalled();
  });
});
