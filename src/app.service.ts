import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  AttributeType,
  IRestableService,
  ResourceListResponse,
  ResourceResponse,
} from './IRestableService';

@Injectable()
export class AppService implements IRestableService {
  db: Record<string, any>;
  constructor() {
    this.db = {};
  }
  getItemsByType(type: string): Promise<ResourceListResponse> {
    const typeCollection = this.getTypeCollection(type);
    const items =
      typeCollection === undefined
        ? []
        : Object.entries(typeCollection).map((kv) => {
            const key: string = kv[0];
            const value: Record<string, any> = kv[1];
            return {
              type,
              id: key,
              attributes: value,
            };
          });
    return Promise.resolve({
      data: items,
    });
  }

  private getTypeCollection(type: string) {
    return this.db[type];
  }

  private getEntryByTypeAndId(type: string, id: string) {
    return this.db[type][id];
  }

  editItem(
    type: string,
    id: string,
    attributes: AttributeType,
  ): Promise<ResourceResponse> {
    const entry = this.getEntryByTypeAndId(type, id);
    const newEntry = {
      id,
      type,
      attributes: { ...entry, ...attributes },
    };
    this.db[type][id] = newEntry.attributes;
    return Promise.resolve({ data: newEntry });
  }

  getHello(): string {
    return 'Hello World!';
  }
  createItem(type: string, body: AttributeType): Promise<ResourceResponse> {
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
    const entry = this.getEntryByTypeAndId(type, id);
    return Promise.resolve({
      data: {
        type,
        id,
        attributes: entry,
      },
    });
  }
}
