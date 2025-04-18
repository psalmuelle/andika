import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import helmet from 'helmet';
import { RedisStore } from 'connect-redis';
import { Redis } from 'ioredis';
import { IoAdapter } from '@nestjs/platform-socket.io';
// import { RedisIoAdapter } from './adapters/websocket-redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'redis://localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    tls: {},
  });

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET || 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );

  app.use(helmet());

  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();

  // app.useWebSocketAdapter(redisIoAdapter);

  const ioAdapter = new IoAdapter(app);
  app.useWebSocketAdapter(ioAdapter);

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
