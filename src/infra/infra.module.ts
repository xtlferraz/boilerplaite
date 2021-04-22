import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { UserRepository } from './database/repository/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
})
export class InfraModule {}
