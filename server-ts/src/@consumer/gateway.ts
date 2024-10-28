import { OnModuleInit } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayInit } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor() { }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`socket connected with id: ${socket.id}`);
    })
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('onMessage', {
      body: body,
      message: 'new Message received'
    });
  }

  sendProcessingMessage(pMessage, pProgress, pProcessing) {
    this.server.emit('onMessage', {
      type: 'updating',
      body: {
        "processing": pProcessing,
        "progress": pProgress,
        "message": pMessage
      },
    });
  }
}
