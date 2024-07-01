import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  app.setGlobalPrefix('api');

  app.use(
    session({
      secret:
        configService.get<string>('SESSION_SECRET') ||
        '7bMbjsuYUwipzVViD9Y7SDzfKi4ETPsX8tAQY',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, // 1 hour
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
}

bootstrap();