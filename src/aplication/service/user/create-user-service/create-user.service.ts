import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user/user.entity';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { ICreateService } from '../../icreteService.interface';

@Injectable()
export class CreateUserService implements ICreateService<User> {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: IRepository<User>,
  ) {}

  public async create(user: User): Promise<User> {
    try {
      return this.userRepository.createData(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
