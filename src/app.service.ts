import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  attributes,
  IRestableService,
  ResourceResponse,
} from './IRestableService';

@Injectable()
export class AppService implements IRestableService {
  db: Record<string, any>;
  constructor() {
    this.db = {};
  }
  getHello(): string {
    return 'Hello World!';
  }
  createItem(type: string, body: attributes): Promise<ResourceResponse> {
    const id = uuidv4();
    this.db = {
      ...this.db,
      [type]: {
        ...this.db[type],
        [id]: { ...body },
      },
    };
    return Promise.resolve({
      data: {
        type,
        id: id,
        attributes: body,
      },
    });
  }
  findById(type: string, id: string): Promise<ResourceResponse> {
    const entry = this.db[type][id];
    return Promise.resolve({
      data: {
        type,
        id,
        attributes: entry,
      },
    });
  }
}
