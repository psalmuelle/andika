import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async saveMessage(data: CreateChatDto) {
    const savedMsg = await this.prismaService.message.create({
      data: {
        content: data.content,
        senderId: data.senderId,
        receiverId: data.receiverId,
      },
    });

    return savedMsg;
  }

  async getMessages({
    firstUserId,
    secondUserId,
  }: {
    firstUserId: number;
    secondUserId: number;
  }) {
    const messages = await this.prismaService.message.findMany({
      where: {
        OR: [
          {
            senderId: firstUserId,
            receiverId: secondUserId,
          },
          {
            senderId: secondUserId,
            receiverId: firstUserId,
          },
        ],
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  }
}
