import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

type attributes = {
  [propName: string]: string | number | boolean;
};
type EntryResponse = {
  type: string;
  id: string;
  attributes: attributes;
};
@Injectable()
export class AppService {
  db: Record<string, any>;
  constructor() {
    this.db = {};
  }
  getHello(): string {
    return 'Hello World!';
  }
  createEntry(type: string, body: attributes): Promise<EntryResponse> {
    const id = uuidv4();
    this.db = {
      ...this.db,
      [type]: {
        ...this.db[type],
        [id]: { ...body },
      },
    };
    return Promise.resolve({
      type,
      id: id,
      attributes: body,
    });
  }
  getEntryById(type: string, id: string): Promise<EntryResponse> {
    const entry = this.db[type][id];
    return Promise.resolve({
      type,
      id,
      attributes: entry,
    });
  }
}
