import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });
  await app.listen(
    process.env.PORT || 5000,
    process.env.HOSTNAME || 'localhost',
    () =>
      console.log(
        `App started on ${process.env.HOSTNAME || 'localhost'}:${process.env.PORT || 5000}`,
      ),
  );
}
bootstrap();
