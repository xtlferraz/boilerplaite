import { Inject, Injectable } from '@nestjs/common';
import { IUpdateService } from 'src/aplication/service/iupdateService.interface';
import { User } from '../../../../domain/entities/user/user.entity';
import { UserDto } from 'src/presentation/http/dto/user/User.dto';
import { IUpdateOperation } from '../../iupdate-operation.interface';

@Injectable()
export class UpdateUserOperation implements IUpdateOperation<UserDto, User> {
  constructor(
    @Inject('IUpdateService')
    private readonly iUpdateService: IUpdateService<User>,
  ) {}
  updateData(data: UserDto, userId: number): Promise<User> {
    return this.iUpdateService.update(userId, new User(data));
  }
}
