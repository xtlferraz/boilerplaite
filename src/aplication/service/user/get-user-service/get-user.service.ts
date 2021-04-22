import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/domain/entities/user/user.entity';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IGetService } from '../../igetService.interface';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';

@Injectable()
export class GetUserService implements IGetService<User> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IRepository<User>,
  ) {}

  public async findOne(userId: number): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }
}
