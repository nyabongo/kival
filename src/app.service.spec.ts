import { AppService } from './app.service';
import * as uuid from 'uuid';

jest.mock('uuid');

describe('AppService', () => {
  let appService: AppService;
  beforeEach(() => {
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
      const uuidSpy = jest.spyOn(uuid, 'v4');
      mockUUID = new Date().toISOString();
      uuidSpy.mockReturnValue(mockUUID);
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
});
