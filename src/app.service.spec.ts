import { AppService } from './app.service';
import * as uuid from 'uuid';
import { ResourceResponse } from './IRestableService';

jest.mock('uuid');

describe('AppService', () => {
  let appService: AppService;
  let uuidSpy: jest.SpyInstance;
  beforeEach(() => {
    uuidSpy = jest.spyOn(uuid, 'v4');
    appService = new AppService();
  });

  it('should return "Hello World!" whel getHello is called', () => {
    expect(appService.getHello()).toBe('Hello World!');
  });

  describe('createEntry', () => {
    const type = 'MockType';
    const body = { some: 'Object' };
    let mockUUID;

    beforeEach(() => {
      mockUUID = new Date().toISOString();
      uuidSpy.mockReturnValue(mockUUID);
    });
    afterAll(() => {
      uuidSpy.mockRestore();
    });

    it('should return the body, type and created id when createEntry is called', async () => {
      expect(await appService.createItem(type, body)).toEqual({
        data: {
          type: type,
          id: mockUUID,
          attributes: body,
        },
      });
    });
    it('should be able to return the created entry using getEntryById', async () => {
      const response = await appService.createItem(type, body);
      const entry = await appService.findById(type, response.data.id);
      expect(entry).toEqual({
        data: {
          type,
          id: mockUUID,
          attributes: body,
        },
      });
    });
  });

  describe('Edit Entry', () => {
    let item: ResourceResponse;
    beforeEach(async () => {
      item = await appService.createItem('superHero', {
        name: 'spiderman',
        alias: 'Peter Parker',
      });
    });

    it('should return a response with only the changed property updated', async () => {
      const changedAlias = 'Miles Morales';
      const newAttribute = 'Brooklyn';
      const {
        data: {
          id,
          type,
          attributes: { alias, residence },
        },
      } = await appService.editItem(item.data.type, item.data.id, {
        alias: changedAlias,
        residence: newAttribute,
      });
      expect(id).toBe(item.data.id);
      expect(type).toBe(item.data.type);
      expect(alias).toBe(changedAlias);
      expect(residence).toBe(newAttribute);
    });

    it('should persist the edited field so that it can be retrieved', async () => {
      const changedAlias = 'Miles Morales';
      const newAttribute = 'Brooklyn';
      await appService.editItem(item.data.type, item.data.id, {
        alias: changedAlias,
        residence: newAttribute,
      });

      const response = await appService.findById(item.data.type, item.data.id);
      const {
        data: {
          id,
          type,
          attributes: { alias, residence },
        },
      } = response;
      expect(id).toBe(item.data.id);
      expect(type).toBe(item.data.type);
      expect(alias).toBe(changedAlias);
      expect(residence).toBe(newAttribute);
    });
  });

  describe('List Items', () => {
    const someItems = [
      { item: 1 },
      { item: 2 },
      { item: 3 },
      { item: 4 },
      { item: 5 },
    ];
    const type = 'someItems';
    beforeEach(async () => {
      for (const item of someItems) {
        uuidSpy.mockReturnValueOnce(`${item.item}`);
        await appService.createItem(type, item);
      }
    });

    it('should return all the items of a given type when getItemsByType is called', async () => {
      const response = await appService.getItemsByType(type);
      expect(response).toEqual({
        data: someItems.map((item) => {
          return {
            type,
            id: expect.any(String),
            attributes: item,
          };
        }),
      });
    });

    it('should return an empty data array when getItemsByType is called for an empty type', async () => {
      const emptyType = 'EmptyType';
      const response = await appService.getItemsByType(emptyType);
      expect(response).toEqual({ data: [] });
    });
  });
});
