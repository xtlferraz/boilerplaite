import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserOperation } from './delete-user.operation';

import { DeleteUserService } from '../../../service/user/delete-user-service/delete-user.service';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { IDeleteService } from '../../../service/ideleteService.interface';
import { User } from '../../../../domain/entities/user/user.entity';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import faker from 'faker';
jest.mock('../../../service/ideleteService.interface');
jest.mock('../../../service/user/delete-user-service/delete-user.service');
jest.mock('../../../../infra/database/repository/user.repository');

describe('DeleteUserOperationService', () => {
  let deleteUserOperation: DeleteUserOperation;
  let deleteUserService: IDeleteService;
  let repository: IRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
      providers: [
        {
          provide: 'IDeleteService',
          useClass: DeleteUserService,
        },
        DeleteUserOperation,
      ],
    }).compile();

    deleteUserOperation = module.get(DeleteUserOperation);
    deleteUserService = module.get('IDeleteService');
    repository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(deleteUserOperation).toBeDefined();
    expect(deleteUserService).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('delete user', async () => {
    const id = faker?.datatype.number();
    deleteUserOperation.delete = jest.fn().mockReturnValue({});
    await deleteUserOperation.delete(id);

    jest
      .spyOn(deleteUserService, 'remove')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(repository, 'destroyData')
      .mockImplementation(() => Promise.resolve());
    expect(await deleteUserService.remove(id)).toBe(undefined);
    expect(await repository.destroyData(id)).toBe(undefined);
    expect(deleteUserOperation.delete).toHaveBeenCalled();
    expect(deleteUserService.remove).toHaveBeenCalled();
    expect(repository.destroyData).toHaveBeenCalled();
  });
});
