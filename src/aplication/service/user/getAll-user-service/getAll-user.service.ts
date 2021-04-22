import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user/user.entity';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { IGetAllService } from '../../igetAllService.interface';

@Injectable()
export class GetAllUserService implements IGetAllService<User> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IRepository<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
