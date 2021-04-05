import { ResourceObject } from './json-api/resource-objects';

export type AttributeType = {
  [propName: string]: string | number | boolean;
};

export type EntryResponse = {
  type: string;
  id: string;
  attributes: AttributeType;
};
export type ResourceResponse = {
  data: ResourceObject;
};

export interface IRestableService {
  createItem(type: string, body: AttributeType): Promise<ResourceResponse>;

  findById(type: string, id: string): Promise<ResourceResponse>;

  editItem(
    type: string,
    id: string,
    attributes: AttributeType,
  ): Promise<ResourceResponse>;
}
