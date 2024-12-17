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
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [
    ChatModule,
    PrismaModule,
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    MailgunModule,
    ProfileModule,
    ProjectRequestModule,
    ProjectModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailgunService, ChatGateway, ChatService],
  exports: [MailgunService],
})
export class AppModule {}
