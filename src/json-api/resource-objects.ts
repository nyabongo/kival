import { ApiProperty } from '@nestjs/swagger';

export class ResourceObject {
  @ApiProperty({ example: 'superheroes' })
  type: string;

  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({
    type: 'object',
    example: {
      name: 'Superman',
      alias: 'Clark Kent',
    },
  })
  attributes: {
    [propName: string]: string | number | boolean;
  };
}

export class PostResourceObject {
  @ApiProperty({ example: 'superheroes' })
  type: string;

  @ApiProperty({
    type: 'object',
    example: {
      name: 'Superman',
      alias: 'Clark Kent',
    },
  })
  attributes: {
    [propName: string]: string | number | boolean;
  };
}
