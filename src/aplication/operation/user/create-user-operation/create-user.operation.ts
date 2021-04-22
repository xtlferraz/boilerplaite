import { Inject, Injectable } from '@nestjs/common';
import { ICreateService } from 'src/aplication/service/icreteService.interface';
import { User } from '../../../../domain/entities/user/user.entity';
import { UserDto } from 'src/presentation/http/dto/user/User.dto';
import { ICreateOperation } from '../../icreate-operation.interface';

@Injectable()
export class CreateUserOperation implements ICreateOperation<UserDto, User> {
  constructor(
    @Inject('ICreateService')
    private readonly icreateService: ICreateService<User>,
  ) {}
  async createData(user: UserDto): Promise<User> {
    return await this.icreateService.create(new User(user));
  }
}
