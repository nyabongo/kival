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
  describe('CreateEntry', () => {
    it('should  return the result of Appservice.createEntry', async () => {
      const fakeResult = {
        id: 'uuid',
        type: 'some-type',
        attributes: { some: 'thing' },
      };
      const spy = jest
        .spyOn(appService, 'createEntry')
        .mockResolvedValue(fakeResult);
      const response = await appController.createEntry(requestBody);
      expect(spy).toHaveBeenCalledWith(
        requestBody.data.type,
        requestBody.data.attributes,
      );
      expect(response).toBe(fakeResult);
    });
  });
});
