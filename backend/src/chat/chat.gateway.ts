import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('privateMessage')
  async handlePrivateMessage(
    @MessageBody() data: CreateChatDto,
  ): Promise<void> {
    const room = this.getRoomName(
      data.senderId.toString(),
      data.receiverId.toString(),
    );
     console.log(this.server.sockets.adapter.rooms)
    const message = await this.chatService.saveMessage(data);
    this.server.to(room).emit('privateMessage', message);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: { user: string; admin: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const room = this.getRoomName(data.user, data.admin);
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: { user: string; admin: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const room = this.getRoomName(data.user, data.admin);
    client.leave(room);
    client.emit('leftRoom', room);
  }

  private getRoomName(user1: string, user2: string): string {
    return [user1, user2].sort().join('_');
  }
}
