import { Module } from '@nestjs/common';
import Mailgun from 'mailgun.js';

@Module({
  providers: [
    {
      provide: 'MAILGUN_CLIENT',
      useFactory: () => {
        const FormData = require('form-data');
        const mailgun = new Mailgun(FormData);
        return mailgun.client({
          username: 'api',
          key: process.env.MAILGUN_API_KEY || '',
        });
      },
    },
  ],
  exports: ['MAILGUN_CLIENT'],
})
export class MailgunModule {}
