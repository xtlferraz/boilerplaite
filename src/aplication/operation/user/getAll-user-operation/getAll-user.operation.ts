import { Inject, Injectable } from '@nestjs/common';
import { IGetAllService } from 'src/aplication/service/igetAllService.interface';
import { User } from 'src/domain/entities/user/user.entity';
import { IGetAllOperation } from '../../igetAll-operation.interface';

@Injectable()
export class GetAllUserOperation implements IGetAllOperation<User> {
  constructor(
    @Inject('IGetAllService')
    private readonly igetAllService: IGetAllService<User>,
  ) {}
  getAllData(): Promise<User[]> {
    return this.igetAllService.findAll();
  }
}
