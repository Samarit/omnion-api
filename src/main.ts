import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true });

  console.log(process.env.HOST, process.env.PORT);

  await app.listen(
    process.env.PORT || 5000,
    process.env.HOST || 'localhost',
    () =>
      console.log(
        `App started on ${process.env.HOST || 'localhost'}:${process.env.PORT || 5000}`,
      ),
  );
}
bootstrap();
