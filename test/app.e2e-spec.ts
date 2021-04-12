import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as uuid from 'uuid';
const create_resource_dto = {
  data: {
    type: 'heroes',
    attributes: {
      alias: 'Peter Parker',
      name: 'Spiderman',
    },
  },
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('Creating an entry', () => {
    function createResource(path: string, payload: any) {
      return request(app.getHttpServer()).post(path).send(payload);
    }
    let response: request.Response;
    beforeEach(async () => {
      response = await createResource('/heroes', create_resource_dto);
    });

    it('should return a created status code', async () => {
      expect(response.status).toEqual(201);
    });
    it('should return a payload matching the payload initially sent', async () => {
      expect(response.body).toMatchObject(create_resource_dto);
    });
    it('should return a payload with an id that is a valid uuid', async () => {
      expect(uuid.validate(response.body.data.id)).toBeTruthy();
    });
  });
});
