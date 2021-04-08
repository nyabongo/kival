import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ResourceListResponse } from './IRestableService';
import {
  PostResourceObject,
  ResourceObject,
} from './json-api/resource-objects';

class PostBody {
  @ApiProperty()
  data: PostResourceObject;
}
class PatchBody {
  @ApiProperty()
  data: ResourceObject;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/:type')
  @ApiResponse({ status: 200, type: ResourceListResponse })
  fetchItemsByType(@Param('type') type: string) {
    return this.appService.getItemsByType(type);
  }
  @Post('/:type')
  @ApiResponse({
    status: 201,
    type: ResourceObject,
    description: 'Created new Resource, responds with resource object',
  })
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
    return this.appService.createItem(body.data.type, body.data.attributes);
  }

  @Get('/:type/:id')
  @ApiResponse({ status: 200, type: ResourceObject })
  @ApiResponse({ status: 404, description: 'Failed to find resource' })
  getEntryById(@Param('type') type: string, @Param('id') id: string) {
    return this.appService.findById(type, id);
  }

  @Patch('/:type/:id')
  @ApiResponse({ status: 200, type: ResourceObject })
  updateResource(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body() body: PatchBody,
  ) {
    return this.appService.editItem(type, id, body.data.attributes);
  }
}
