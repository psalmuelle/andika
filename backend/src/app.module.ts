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
import { ProjectModule } from './project/project.module';
import { ProjectRequestModule } from './project-request/project-request.module';
import { UploadModule } from './upload/upload.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    MailgunModule,
    ProfileModule,
    ProjectRequestModule,
    ProjectModule,
    UploadModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailgunService],
  exports: [MailgunService],
})
export class AppModule {}
