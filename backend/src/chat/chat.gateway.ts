import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import Redis from 'ioredis';
import { Server, Socket } from 'socket.io';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    transports: ['websocket'],
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('chat')
  async handleMessage(@MessageBody() data: CreateChatDto) {
    const room = this.getRoomName(
      data.senderId.toString(),
      data.receiverId.toString(),
    );

    const roomExists = this.server.sockets.adapter.rooms.has(room);
    if (roomExists) {
      const message = await this.chatService.saveMessage(data);
      this.server.to(room).emit('chat', message);
    }
  }

  @SubscribeMessage('joinRoom')
  handleRoom(
    @MessageBody() data: { user: string; admin: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = this.getRoomName(data.user, data.admin);
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: { user: string; admin: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = this.getRoomName(data.user, data.admin);
    client.leave(room);
    client.emit('leftRoom', room);
  }

  @SubscribeMessage('isTyping')
  handleIsTyping(
    @MessageBody() data: { user: string; admin: string; isTyping: boolean },
  ) {
    const room = this.getRoomName(data.user, data.admin);
    this.server
      .to(room)
      .emit('isTyping', { user: data.user, isTyping: data.isTyping });
  }

  @SubscribeMessage('markAsRead')
  async handleReadMessages(
    @MessageBody() data: { id: number; user: string; admin: string },
  ) {
    const room = this.getRoomName(data.user, data.admin);
    const messages = await this.chatService.markMessagesAsRead(data.id);
    this.server.to(room).emit('messagesRead', messages);
  }

  @SubscribeMessage('unreadMessages')
  async handleGetUnreadMessages(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { user: string; admin: string },
  ) {
    const messages = await this.chatService.getUnreadMessages(+data.user);
    client.emit('unreadMessages', messages);
  }

  private getRoomName(user: string, admin: string): string {
    return [user, admin].sort().join('_');
  }
}
