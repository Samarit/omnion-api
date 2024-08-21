import { Body, Controller, Post, Req } from '@nestjs/common';
import { createChatDto } from 'src/modules/chat/chat.dto';
import { ChatService } from 'src/services/chat/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('create')
  async createChat(@Req() req: any, @Body() body: createChatDto) {
    const { user_id } = body;
    return await this.chatService.createChat(user_id);
  }
}
