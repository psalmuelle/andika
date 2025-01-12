import { Inject, Injectable } from '@nestjs/common';
import { IMailgunClient } from 'mailgun.js/Interfaces';

@Injectable()
export class MailgunService {
  constructor(
    @Inject('MAILGUN_CLIENT') private readonly mailgunClient: IMailgunClient,
  ) {}

  async sendEmail({
    to,
    subject,
    text,
    html,
  }: {
    to: string;
    subject: string;
    text: string;
    html?: string;
  }) {
    return this.mailgunClient.messages.create('andikadocs.tech', {
      from: 'Sam from Andika <sam@andikadocs.tech>',
      to: [to],
      subject,
      text,
      html,
    });
  }
}
