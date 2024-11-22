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
    return this.mailgunClient.messages.create(
      'sandboxc904a821b64b46bb81c758d4c14b7558.mailgun.org',
      {
        from: 'Sam from Andika <mailgun@sandboxc904a821b64b46bb81c758d4c14b7558.mailgun.org>',
        to: [to],
        subject,
        text,
        html,
      },
    );
  }
}
