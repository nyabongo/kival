import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
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
    if (body.data.type !== type) {
      throw new HttpException(
        {
          errors: [
            {
              title: 'Bad Request',
              details: `The URL type parameter "${type}" does not match the data attribute: "${body.data.type}"`,
            },
          ],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.appService.createEntry(body.data.type, body.data.attributes);
  }
  @Get('/:type/:id')
  getEntryById(@Param('type') type: string, @Param('id') id: string) {
    return this.appService.getEntryById(type, id);
  }
}
