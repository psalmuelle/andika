import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNotification(userId: number, message: string) {
    const notification = await this.prismaService.notification.create({
      data: {
        userId,
        content: message,
      },
    });
    return notification;
  }

  async getNotifications(userId: number) {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        userId,
      },
      orderBy: { createdAt: 'desc' },
    });
    return notifications;
  }

  async markAllAsRead(userId: number) {
    const notificationExists = await this.prismaService.notification.findMany({
      where: { userId },
    });
    if (notificationExists.length > 0) {
      return this.prismaService.notification.deleteMany({
        where: {
          userId,
        },
      });
    }
    return;
  }
}
