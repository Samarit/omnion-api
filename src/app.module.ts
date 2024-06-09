import { Module } from '@nestjs/common';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import { SocketGateway } from './socket/socket.gateway';
import OmniStreamService from './services/omni-stream/omni-stream.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService, OmniStreamService, SocketGateway],
})
export class AppModule {
  constructor() {
    ConfigModule.forRoot();
  }
}
