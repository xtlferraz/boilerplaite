import { Inject, Injectable } from '@nestjs/common';
import { IDeleteService } from 'src/aplication/service/ideleteService.interface';

@Injectable()
export class DeleteUserOperation {
  constructor(
    @Inject('IDeleteService')
    private readonly ideleteService: IDeleteService,
  ) {}
  delete(id: number): Promise<void> {
    return this.ideleteService.remove(id);
  }
}
