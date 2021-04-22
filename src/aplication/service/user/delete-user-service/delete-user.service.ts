import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user/user.entity';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { IDeleteService } from '../../ideleteService.interface';

@Injectable()
export class DeleteUserService implements IDeleteService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IRepository<User>,
  ) {}

  public async remove(id: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    await this.userRepository.destroyData(id);
  }
}
