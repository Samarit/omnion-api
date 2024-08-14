import { MessageEntity } from './../modules/chat/message.entity';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/infrastructure/guards/auth/auth.guard';
import { createChatDto, saveMessageDto } from 'src/modules/chat/chat.dto';
import { ChatEntity } from 'src/modules/chat/chat.entity';
import { ChatService } from 'src/services/chat/chat.service';
@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('create')
  async createChat(@Req() req: Request, @Body() body: createChatDto) {
    const { userID } = body;
    const chat = new ChatEntity();
    chat.user_id = userID;
    return await this.chatService.createChat(chat);
  }

  @Post('message')
  async saveMessage(@Req() req: Request, @Body() body: saveMessageDto) {
    const { userID, chatID, message } = body;
    const messageEntity = new MessageEntity();
    messageEntity.user_id = userID;
    messageEntity.chat_id = chatID;
    messageEntity.message = message;
    return await this.chatService.saveMessage(messageEntity);
  }

  @Get('history')
  async getHistory(@Req() req: Request, @Query() query: { chatID: number }) {
    const chat_id = query.chatID;
    if (!chat_id) throw new HttpException('Provide chatID', 400);
    console.log(`Get history for chat ${chat_id}`);
    return await this.chatService.getHistory(Number(chat_id));
  }
}
