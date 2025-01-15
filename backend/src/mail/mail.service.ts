import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService,
    private readonly prismaSevice: PrismaService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get<string>('TITAN_MAIL_EMAIL'),
        pass: this.configService.get<string>('TITAN_MAIL_PASSWORD'),
      },
    });
  }

  /**
   * Send email using Nodemailer
   * @param to - Recipient email address
   * @param subject - Email subject
   * @param text - Plain text body
   * @param html - HTML body (optional)
   */
  async sendMail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    try {
      const mailOptions = {
        from: '"AndikaDocs Support" <sam@andikadocs.tech>', // Sender email
        to, // Recipient(s)
        subject, // Subject line
        text, // Plain text body
        html, // HTML body (optional)
      };

      const info = await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async reachOut(from: string, message: string, name: string) {
    try {
      const createdMessage = await this.prismaSevice.contactTeam.create({
        data: {
          name,
          email: from,
          message,
        },
      });
      return;
    } catch (err) {
      console.error('Error reaching out to the team:', err);
      throw err;
    }
  }

  async getAllContactTeams({ userIsAdmin }: { userIsAdmin: boolean }) {
    try {
      if (!userIsAdmin) {
        throw new UnauthorizedException();
      }
      const contactTeams = await this.prismaSevice.contactTeam.findMany();
      return contactTeams;
    } catch (err) {
      console.error('Error getting all contact teams:', err);
      throw err;
    }
  }

  async markContactTeamAsRead({
    id,
    userIsAdmin,
  }: {
    id: string;
    userIsAdmin: boolean;
  }) {
    try {
      if (!userIsAdmin) {
        throw new UnauthorizedException();
      }
      await this.prismaSevice.contactTeam.update({
        where: {
          id: parseInt(id),
        },
        data: {
          status: true,
        },
      });
    } catch (err) {
      console.log('Error marking contact team as read:', err);
      throw err;
    }
  }
}
