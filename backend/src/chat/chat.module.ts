import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        type: 'single',
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      }),
    }),
  ],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
