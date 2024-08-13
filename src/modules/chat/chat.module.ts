import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { MessageEntity } from './message.entity';
import { ChatService } from 'src/services/chat/chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, MessageEntity])],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
