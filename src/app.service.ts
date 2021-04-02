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

export interface IRestableService {
  createItem(type: string, body: attributes): Promise<EntryResponse>;
  findById(type: string, id: string): Promise<EntryResponse>;
}

@Injectable()
export class AppService implements IRestableService {
  db: Record<string, any>;
  constructor() {
    this.db = {};
  }
  getHello(): string {
    return 'Hello World!';
  }
  createItem(type: string, body: attributes): Promise<EntryResponse> {
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
  findById(type: string, id: string): Promise<EntryResponse> {
    const entry = this.db[type][id];
    return Promise.resolve({
      type,
      id,
      attributes: entry,
    });
  }
}
