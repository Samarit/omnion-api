import { Logger, Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import OmniStreamService from './services/omni-stream/omni-stream.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { SocketGateway } from './modules/socket/socket.gateway';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pgpass',
      database: 'pgdb',
      entities: [User],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, OmniStreamService, SocketGateway, Logger],
})
export class AppModule {
  constructor() {}
}
