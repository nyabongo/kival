import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

type requestBody = {
  data: {
    type: string;
    attributes: {
      [propName: string]: string | number | boolean;
    };
  };
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/:type')
  createEntry(@Body() body: requestBody): any {
    return this.appService.createEntry(body.data.type, body.data.attributes);
  }
  @Get('/:type/:id')
  getEntryById(@Param('type') type: string, @Param('id') id: string) {
    return this.appService.getEntryById(type, id);
  }
}
