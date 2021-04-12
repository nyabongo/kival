import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { version } from '../package.json';

const RESTABLE_DESCRIPTION = `
  Restable is a specification for communication with databases using REST calls.
  It Abstracts away the database implementation so that actual databases can be switched 
  with minimal impact on client applications and services
  `;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The Restable API')
    .setDescription(RESTABLE_DESCRIPTION)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_doc', app, document);
  await app.listen(3000);
}
bootstrap();
