import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthorizedGaurd } from 'src/auth/guard';

@UseGuards(AuthorizedGaurd)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/:otherUserId')
  async getMessages(
    @Param('otherUserId', ParseIntPipe) otherUserId: number,
    @Req() req: any,
  ) {
    const userId = req.user?.id as number;
    return await this.chatService.getMessages({
      firstUserId: userId,
      secondUserId: otherUserId,
    });
  }

  @Get('/unread/all')
  async getAllUnreadMessages(@Req() req: any) {
    try {
      const userId = req.user?.id as number;
      const unreadMsgs = await this.chatService.getUnreadMessages(userId);
      return unreadMsgs;
    } catch (err) {
      throw err;
    }
  }

  @Delete('/delete/:otherUserId')
  async deleteChats(
    @Param('otherUserId', ParseIntPipe) otherUserId: number,
    @Req() req: any,
  ) {
    try {
      const userId = req.user?.id as number;
      const userIsAdmin = req.user?.isAdmin as boolean;
      await this.chatService.deleteUserChats({
        userId: otherUserId,
        adminId: userId,
        isAdmin: userIsAdmin,
      });
    } catch (err) {
      throw err;
    }
  }
}
