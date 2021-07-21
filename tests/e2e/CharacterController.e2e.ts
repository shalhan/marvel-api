import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CharacterModule } from 'src/Character';
import { CommonModule } from 'src/Common';

describe('Character API', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CharacterModule, CommonModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /characters', () => {
    it('should return 200', () => {
      return request(app.getHttpServer()).get('/cats').expect(200);
    });
  });
});
