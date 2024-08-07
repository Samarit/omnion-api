import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import OpenAI from 'openai';
import { Stream } from 'openai/streaming';

import { Server, Socket } from 'socket.io';
import OmniStreamService from 'src/services/omni-stream/omni-stream.service';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private omniService: OmniStreamService) {}

  @WebSocketServer() io: Server;

  afterInit(server: any) {}

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected socket: ${client}`);
    console.log(`Total connections: ${this.io.sockets.sockets.size}`);

    const data = await this.omniService.sendMessageStream({
      role: 'user',
      content: 'Say Hello Samarit',
    });

    if (!data) {
      console.error('No response from Omni');
      client.emit('message', 'No response from Omni');
      return;
    }

    await emitAsStream(client, data);
  }

  handleDisconnect(client: any) {
    console.log(`Disconnected: ${client}`);
    console.log(`Total connections: ${this.io.sockets.sockets.size}`);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: any) {
    console.log(`SOCKET MESSAGE: ${payload}`);

    const data = await this.omniService.sendMessageStream({
      role: 'user',
      content: payload,
    });

    if (!data) {
      console.error('No response from Omni');
      client.emit('message', 'No response from Omni');
      return;
    }

    emitAsStream(client, data);

    return;
  }
}

const emitAsStream = async (
  socket: Socket,
  data: Stream<OpenAI.Chat.Completions.ChatCompletionChunk>,
) => {
  socket.emit('response:start');

  for await (let chunk of data) {
    const msg = chunk.choices[0]?.delta?.content;
    socket.emit('response:chunk', chunk.choices[0]?.delta?.content || '');
  }
  socket.emit('response:end');
};
