import { Inject, Injectable } from '@nestjs/common';
import { IGetService } from 'src/aplication/service/igetService.interface';
import { User } from 'src/domain/entities/user/user.entity';
import { IGetOperation } from '../../iget-operation.interface';

@Injectable()
export class GetUserOperation implements IGetOperation<User> {
  constructor(
    @Inject('IGetService')
    private readonly igetService: IGetService<User>,
  ) {}
  async getData(userId: number): Promise<User> {
    return await this.igetService.findOne(userId);
  }
}
