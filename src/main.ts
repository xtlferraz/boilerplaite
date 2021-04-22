import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';
import * as helmet from 'helmet';

dotenv.config();

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Boilerplate')
    .setDescription('The Boilerplate API description')
    .setVersion('1.0')
    .addTag('boilerplate')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
