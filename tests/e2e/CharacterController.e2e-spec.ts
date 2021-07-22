import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app';
import { HttpService } from '@nestjs/axios';

describe('Character API', () => {
  let app: INestApplication;
  const httpService = {
    request: () => ({
      toPromise: () => ({
        data: {
          data: {
            count: 1,
            results: [{ id: 1, name: 'hero', description: 'description' }],
          },
        },
      }),
    }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HttpService)
      .useValue(httpService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /characters', () => {
    it('should return 200', () => {
      return request(app.getHttpServer()).get('/api/v1/characters').expect(200);
    });
  });

  describe('GET /characters/:id', () => {
    it('should return 200', async () => {
      return request(app.getHttpServer())
        .get('/api/v1/characters/1')
        .expect(200);
    });
  });
});
