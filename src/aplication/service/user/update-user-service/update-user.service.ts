import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../domain/entities/user/user.entity';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { IUpdateService } from '../../iupdateService.interface';

@Injectable()
export class UpdateUserService implements IUpdateService<User> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IRepository<User>,
  ) {}

  public async update(userId: number, user: User): Promise<User> {
    const dataUser = await this.userRepository.findById(userId);
    if (!dataUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return this.userRepository.editData(userId, new User(user));
  }
}
