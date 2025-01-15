import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { AuthorizedGaurd } from 'src/auth/guard';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @Post()
  async contactTeam(
    @Body() body: { name: string; email: string; message: string },
  ) {
    try {
      return this.mailService.reachOut(body.email, body.message, body.name);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthorizedGaurd)
  @Get()
  async getAllContactTeams(@Req() req: any) {
    try {
      const userIsAdmin = req.user?.isAdmin as boolean;
      return this.mailService.getAllContactTeams({ userIsAdmin });
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthorizedGaurd)
  @Put('update/:id')
  async updateContactTeam(@Req() req: any, @Param('id') id: string) {
    try {
      const userIsAdmin = req.user?.isAdmin as boolean;
      return this.mailService.markContactTeamAsRead({ userIsAdmin, id });
    } catch (error) {
      throw error;
    }
  }
}
