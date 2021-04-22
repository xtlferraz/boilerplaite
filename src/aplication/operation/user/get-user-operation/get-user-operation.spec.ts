import { Test, TestingModule } from '@nestjs/testing';
import { IGetService } from '../../../service/igetService.interface';
import { User } from 'src/domain/entities/user/user.entity';

import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { GetUserService } from '../../../service/user/get-user-service/get-user.service';
import { GetUserOperation } from './get-user.operation';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import faker from 'faker';
jest.mock('../../../service/igetService.interface');
jest.mock('../../../service/user/get-user-service/get-user.service');
jest.mock('../../../../infra/database/repository/user.repository');

describe('GetUserOperationService', () => {
  let getUserOperation: GetUserOperation;
  let getUserService: IGetService<User>;
  let repository: IRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
      providers: [
        {
          provide: 'IGetService',
          useClass: GetUserService,
        },
        GetUserOperation,
      ],
    }).compile();

    getUserOperation = module.get(GetUserOperation);
    getUserService = module.get('IGetService');
    repository = module.get(UserRepository);
  });

  it('should be defined', async () => {
    expect(getUserOperation).toBeDefined();
    expect(getUserService).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('get Data User', async () => {
    const firstName = faker?.name.firstName();
    const lastName = faker?.name.lastName();
    const id = faker?.datatype.number();
    const testUsers = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`,
      password: faker?.internet.password(),
    };
    getUserOperation.getData = jest.fn().mockReturnValue(testUsers);

    const result = await getUserOperation.getData(1);

    jest
      .spyOn(getUserService, 'findOne')
      .mockImplementation(() => Promise.resolve(testUsers));
    jest
      .spyOn(repository, 'findById')
      .mockImplementation(() => Promise.resolve(testUsers));

    expect(await getUserService.findOne(id)).toBe(testUsers);

    expect(await repository.findById(id)).toBe(testUsers);

    expect(result).toEqual(testUsers);
    expect(getUserOperation.getData).toHaveBeenCalled();
    expect(getUserService.findOne).toHaveBeenCalled();
    expect(repository.findById).toHaveBeenCalled();
  });
});
