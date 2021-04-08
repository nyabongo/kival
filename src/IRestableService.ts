import { ApiProperty } from '@nestjs/swagger';
import { ResourceObject } from './json-api/resource-objects';

export class AttributeType {
  [propName: string]: string | number | boolean;
}

export class EntryResponse {
  type: string;
  id: string;
  attributes: AttributeType;
}
export class ResourceResponse {
  @ApiProperty()
  data: ResourceObject;
}
export class ResourceListResponse {
  @ApiProperty({ type: [ResourceObject] })
  data: ResourceObject[];
}

export interface IRestableService {
  createItem(type: string, body: AttributeType): Promise<ResourceResponse>;

  findById(type: string, id: string): Promise<ResourceResponse>;

  editItem(
    type: string,
    id: string,
    attributes: AttributeType,
  ): Promise<ResourceResponse>;

  getItemsByType(type: string): Promise<ResourceListResponse>;
}
