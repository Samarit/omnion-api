import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() io: Server;

  afterInit(server: any) {
    console.log('SOCKET GATEWAY INIT');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected socket: ${client}`);
    console.log(`Total connections: ${this.io.sockets.sockets.size}`);
  }

  handleDisconnect(client: any) {
    console.log(`Disconnected: ${client}`);
    console.log(`Total connections: ${this.io.sockets.sockets.size}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    console.log(`SOCKET MESSAGE: ${payload}`);

    return;
  }
}
