import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Debug environment variables
console.log('Environment variables:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'NOT SET');
console.log('DB_NAME:', process.env.DB_NAME);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Adjust to your frontend URL
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();