import { beforeEach, describe, it } from 'bun:test';
import type { INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import { ApiModule } from 'apps/api/src/api.module';
import supertest from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return supertest(app.getHttpServer()).get('/').expect(200).expect('Hello World!');
  });
});
