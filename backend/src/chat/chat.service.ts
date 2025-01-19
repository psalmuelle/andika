import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService) {}

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

  async getUnreadMessages(userId: number) {
    const unreadMessages = await this.prismaService.message.findMany({
      where: {
        receiverId: userId,
        isRead: false,
      },
    });

    return unreadMessages;
  }

  async markMessagesAsRead(id: number) {
    const markMessages = await this.prismaService.message.update({
      where: {
        id: id,
      },
      data: {
        isRead: true,
      },
    });

    return markMessages;
  }

  async deleteUserChats({
    userId,
    adminId,
    isAdmin,
  }: {
    userId: number;
    adminId: number;
    isAdmin: boolean;
  }) {
    try {
      if (!isAdmin) {
        throw new UnauthorizedException();
      }

      await this.prismaService.message.deleteMany({
        where: {
          OR: [
            {
              senderId: userId,
              receiverId: adminId,
            },
            {
              senderId: adminId,
              receiverId: userId,
            },
          ],
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
