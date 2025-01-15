import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { ProjectModule } from './project/project.module';
import { ProjectRequestModule } from './project-request/project-request.module';
import { UploadModule } from './upload/upload.module';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatService } from './chat/chat.service';
import { NotificationsModule } from './notifications/notifications.module';
import { BlogModule } from './blog/blog.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ChatModule,
    PrismaModule,
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ProfileModule,
    ProjectRequestModule,
    ProjectModule,
    UploadModule,
    NotificationsModule,
    BlogModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway, ChatService],
})
export class AppModule {}
