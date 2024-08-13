import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from 'src/modules/chat/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity) private chatRepo: Repository<ChatEntity>,
  ) {}

  async createChat(user_id: number) {
    try {
      const res = await this.chatRepo.insert({ user_id });
      console.log(`Created chat ${res.raw[0].id} for user ${user_id}`);
    } catch (error) {
      throw error;
    }
  }
}
