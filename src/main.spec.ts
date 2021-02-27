import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

describe('main.ts', () => {
  const NestFactorySpy = jest.spyOn(NestFactory, 'create');
  const mockApp = { listen: jest.fn() };
  beforeAll(async () => {
    NestFactorySpy.mockResolvedValue((mockApp as unknown) as INestApplication);
    await import('./main');
  });
  it('should create an Nest app using the app module', () => {
    expect(NestFactorySpy).toHaveBeenCalledWith(AppModule);
  });
  it('should listen at port 3000 in the nest app', () => {
    expect(mockApp.listen).toHaveBeenCalledWith(3000);
  });
});
