import { Controller, Get, Param, ParseIntPipe, Req } from '@nestjs/common';
import { ChatService } from './chat.service';

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
}
