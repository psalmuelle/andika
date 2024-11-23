import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MailgunService } from './mailgun/mailgun.service';
import { MailgunModule } from './mailgun/mailgun.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    MailgunModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailgunService],
  exports: [MailgunService],
})
export class AppModule {}
