import { Logger, Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import OmniStreamService from './services/omni-stream/omni-stream.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { SocketGateway } from './modules/socket/socket.gateway';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './modules/user/user.entity';
import { ChatModule } from './modules/chat/chat.module';
import { ChatController } from './controllers/chat.controller';
import { MessageEntity } from './modules/chat/message.entity';
import { ChatEntity } from './modules/chat/chat.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ChatModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pgpass',
      database: 'pgdb',
      entities: [UserEntity, ChatEntity, MessageEntity],
    }),
  ],
  controllers: [AppController, ChatController],
  providers: [AppService, OmniStreamService, SocketGateway, Logger],
})
export class AppModule {
  constructor() {}
}
