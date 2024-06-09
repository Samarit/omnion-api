import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() io: Server;

  afterInit(server: any) {
    console.log('SOCKET GATEWAY INIT');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Connected socket: ${client}`);
    console.log(`Total connections: ${this.io.sockets.sockets.size}`);
  }

  handleDisconnect(client: any) {
    console.log(`Disconnected: ${client}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('MESSAGE');
    client.emit('message', 'loh');
    return 'Hello loh!';
  }
}
