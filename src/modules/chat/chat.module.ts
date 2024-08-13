import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './chat.entity';
import { MessageEntity } from './message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, MessageEntity])],
  providers: [],
  exports: [],
})
export class ChatModule {}
