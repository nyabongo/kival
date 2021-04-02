import { ResourceObject } from './json-api/resource-objects';

export type attributes = {
  [propName: string]: string | number | boolean;
};

export type EntryResponse = {
  type: string;
  id: string;
  attributes: attributes;
};
export type ResourceResponse = {
  data: ResourceObject;
};

export interface IRestableService {
  createItem(type: string, body: attributes): Promise<ResourceResponse>;

  findById(type: string, id: string): Promise<ResourceResponse>;

}
