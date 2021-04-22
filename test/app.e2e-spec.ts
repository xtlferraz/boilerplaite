import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AplicationModule } from '../src/aplication/aplication.module';
import { winstonConfig } from '../src/configs/winston.config';
import { DomainModule } from '../src/domain/domain.module';
import { InfraModule } from '../src/infra/infra.module';
import { LoggerInterceptor } from '../src/interceptors/logger.interceptors';
import { UserController } from '../src/presentation/http/controller/user/user.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let module: TestingModule;

  beforeEach(async (done) => {
    module = await Test.createTestingModule({
      imports: [
        AplicationModule,
        DomainModule,
        InfraModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          port: 3306,
          username: 'root',
          password: '',
          database: 'test',
          synchronize: true,
          dropSchema: true,
          keepConnectionAlive: true,
          entities: ['./src/**/*.entity.{js,ts}'],
        }),
        WinstonModule.forRoot(winstonConfig),
      ],
      controllers: [UserController],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: LoggerInterceptor,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    done();
  });

  it('/ (GET)', async (done) => {
    await request(app.getHttpServer()).get('/user').expect(200).expect([]);
    done();
  });

  it('/ (POST)', async (done) => {
    const testUsers = {
      firstName: 'teste',
      lastName: 'teste 2',
      password: '123456',
    };

    const dataResponse = {
      id: 1,
      firstName: 'teste',
      lastName: 'teste 2',
      isActive: true,
      fullName: 'teste teste 2',
    };

    await request(app.getHttpServer())
      .post('/user')
      .send(testUsers)
      .expect(201)
      .expect(dataResponse);
    done();
  });
  it('/:id (GET)', async (done) => {
    const dataResponse = {
      id: 1,
      firstName: 'teste',
      lastName: 'teste 2',
      isActive: true,
      fullName: 'teste teste 2',
    };
    await request(app.getHttpServer())
      .get('/user/1')
      .expect(200)
      .expect(dataResponse);
    done();
  });

  it('/:id (PATCH)', async (done) => {
    const dataResponse = {
      id: 2,
      firstName: 'teste3',
      lastName: 'teste 2',
      isActive: true,
      fullName: 'teste3 teste 2',
    };
    const testUsers = {
      firstName: 'teste3',
      lastName: 'teste 2',
      password: '123456',
    };
    await request(app.getHttpServer())
      .patch('/user/1')
      .send(testUsers)
      .expect(200)
      .expect(dataResponse);
    done();
  });

  it('/:id (DELETE)', async (done) => {
    await request(app.getHttpServer()).delete('/user/1').expect(200);
    done();
  });

  afterAll(async () => {
    await app.close();
  });
});
