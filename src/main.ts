import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { NextFunction } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:1420', // Specify the allowed origin 
    methods: 'GET,POST', // Allowed methods
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization' 
  });
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
