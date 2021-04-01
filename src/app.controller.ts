import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { AppService } from './app.service';

class Data {
  @ApiProperty({ type: 'string', example: 'superheroes' })
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
class PostBody {
  @ApiProperty()
  data: Data;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/:type')
  createEntry(@Body() body: PostBody, @Param('type') type: string): any {
    return this.appService.createEntry(body.data.type, body.data.attributes);
  }
  @Get('/:type/:id')
  getEntryById(@Param('type') type: string, @Param('id') id: string) {
    return this.appService.getEntryById(type, id);
  }
}
