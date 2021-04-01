import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const requestBody = {
  data: {
    type: 'superheroes',
    attributes: {
      name: 'Logan Howlett',
      alias: 'wolverine',
    },
  },
};
const fakeResult = {
  id: 'uuid',
  type: 'some-type',
  attributes: { some: 'thing' },
};

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
    appService = app.get<AppService>(AppService);
    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  describe('/:type', () => {
    describe('GET /:type', () => {
      it('should return the result of appservice.getEntryById', async () => {
        const { type, id } = fakeResult;

        const spy = jest
          .spyOn(appService, 'getEntryById')
          .mockResolvedValue(fakeResult);
        const response = await appController.getEntryById(type, id);
        expect(spy).toHaveBeenCalledWith(type, id);
        expect(response).toBe(fakeResult);
      });
    });
    describe('CreateEntry', () => {
      it('should throw an httpexception with a bad request status if the url type does not match the data type', () => {
        const otherType = 'not' + requestBody.data.type;
        expect(() => {
          appController.createEntry(requestBody, otherType);
        }).toThrow(
          new HttpException(
            {
              errors: [
                {
                  title: 'Bad Request',
                  details: `The URL type parameter "${otherType}" does not match the data attribute: "${requestBody.data.type}"`,
                },
              ],
            },
            HttpStatus.BAD_REQUEST,
          ),
        );
      });
      it('should  return the result of Appservice.createEntry', async () => {
        const spy = jest
          .spyOn(appService, 'createEntry')
          .mockResolvedValue(fakeResult);
        const response = await appController.createEntry(
          requestBody,
          requestBody.data.type,
        );
        expect(spy).toHaveBeenCalledWith(
          requestBody.data.type,
          requestBody.data.attributes,
        );
        expect(response).toBe(fakeResult);
      });
    });
  });
});
