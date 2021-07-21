import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { MarvelIntegrationService } from '../MarvelIntegrationService';

describe('@common.service.MarvelIntegrationService', () => {
  let service: MarvelIntegrationService;
  let mockHttp: jest.Mocked<HttpService>;
  let promise: jest.Mocked<Observable<any>>;
  beforeEach(() => {
    promise = {
      toPromise: jest.fn(),
    } as any;
    mockHttp = {
      request: () => promise,
    } as any;
    service = new MarvelIntegrationService(mockHttp);
  });
  it('calls mockHttp.request once', async () => {
    promise.toPromise.mockResolvedValueOnce({ data: {} });
    await service.get('/endpoint');
    expect(mockHttp.request({ url: '/enpoint' }).toPromise).toHaveBeenCalled();
  });
});
