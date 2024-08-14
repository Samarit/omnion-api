import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from 'src/modules/chat/chat.entity';
import { MessageEntity } from 'src/modules/chat/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity) private chatRepo: Repository<ChatEntity>,
    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,
  ) {}

  async createChat(chat: ChatEntity) {
    try {
      const res = await this.chatRepo.insert(chat);
      console.log(`Created chat ${res.raw[0].id} for user ${chat.user_id}`);
    } catch (error) {
      throw error;
    }
  }

  async saveMessage(message: MessageEntity) {
    try {
      await this.messageRepo.insert(message);
      console.log(
        `Saved message for user ${message.user_id} in chat ${message.chat_id}`,
      );
    } catch (error) {
      throw error;
    }
  }

  async getHistory(chat_id: number) {
    try {
      const res = await this.messageRepo.find({ where: { chat_id } });
      return res;
    } catch (error) {
      throw error;
    }
  }
}
