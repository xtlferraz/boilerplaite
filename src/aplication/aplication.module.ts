import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { CreateUserService } from './service/user/create-user-service/create-user.service';
import { CreateUserOperation } from './operation/user/create-user-operation/create-user.operation';
import { UserRepository } from '../infra/database/repository/user.repository';
import { GetUserOperation } from './operation/user/get-user-operation/get-user.operation';
import { UpdateUserOperation } from './operation/user/update-user-operation/update-user.operation';
import { GetAllUserOperation } from './operation/user/getAll-user-operation/getAll-user.operation';
import { DeleteUserOperation } from './operation/user/delete-user-operation/delete-user.operation';
import { DeleteUserService } from './service/user/delete-user-service/delete-user.service';
import { GetUserService } from './service/user/get-user-service/get-user.service';
import { GetAllUserService } from './service/user/getAll-user-service/getAll-user.service';
import { UpdateUserService } from './service/user/update-user-service/update-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DomainModule, TypeOrmModule.forFeature([UserRepository])],
  controllers: [],
  providers: [
    {
      provide: 'ICreateOperation',
      useClass: CreateUserOperation,
    },
    {
      provide: 'IGetOperation',
      useClass: GetUserOperation,
    },
    {
      provide: 'IUpdateOperation',
      useClass: UpdateUserOperation,
    },
    {
      provide: 'IGetAllOperation',
      useClass: GetAllUserOperation,
    },
    {
      provide: 'IDeleteOperation',
      useClass: DeleteUserOperation,
    },
    {
      provide: 'ICreateService',
      useClass: CreateUserService,
    },
    {
      provide: 'IGetService',
      useClass: GetUserService,
    },
    {
      provide: 'IUpdateService',
      useClass: UpdateUserService,
    },
    {
      provide: 'IGetAllService',
      useClass: GetAllUserService,
    },
    {
      provide: 'IDeleteService',
      useClass: DeleteUserService,
    },
  ],
  exports: [
    {
      provide: 'ICreateOperation',
      useClass: CreateUserOperation,
    },
    {
      provide: 'IGetOperation',
      useClass: GetUserOperation,
    },
    {
      provide: 'IUpdateOperation',
      useClass: UpdateUserOperation,
    },
    {
      provide: 'IGetAllOperation',
      useClass: GetAllUserOperation,
    },
    {
      provide: 'IDeleteOperation',
      useClass: DeleteUserOperation,
    },
  ],
})
export class AplicationModule {}
