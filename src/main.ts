import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './infrastructure/interceptors/response/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(cookieParser());

  const HOSTNAME = process.env.HOSTNAME || 'localhost';
  const PORT = process.env.PORT || '5000';

  await app.listen(PORT, HOSTNAME, () =>
    console.log(`App started on ${HOSTNAME}:${PORT}`),
  );
}
bootstrap();
