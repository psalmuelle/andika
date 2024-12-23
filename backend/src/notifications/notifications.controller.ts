import { Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { AuthorizedGaurd } from 'src/auth/guard';

@UseGuards(AuthorizedGaurd)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Get()
  async getUserNotifications(@Req() req: any) {
    try {
      const userId = req.user?.id as number;
      const response = await this.notificationService.getNotifications(userId);
      return response;
    } catch (err) {
      throw err;
    }
  }

  @Put()
  async readAllNotifications(@Req() req: any) {
    try {
      const userId = req.user?.id as number;
      const response = await this.notificationService.markAllAsRead(userId);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
