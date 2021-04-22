import { Module } from '@nestjs/common';
import { AplicationModule } from './aplication/aplication.module';
import { DomainModule } from './domain/domain.module';
import { UserController } from './presentation/http/controller/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfraModule } from './infra/infra.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptors';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/winston.config';

@Module({
  imports: [
    AplicationModule,
    DomainModule,
    InfraModule,
    TypeOrmModule.forRoot(),
    WinstonModule.forRoot(winstonConfig),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
