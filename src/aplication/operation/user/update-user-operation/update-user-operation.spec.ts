import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserOperation } from './update-user.operation';

import { UpdateUserService } from '../../../service/user/update-user-service/update-user.service';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { IUpdateService } from '../../../service/iupdateService.interface';
import { User } from '../../../../domain/entities/user/user.entity';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import faker from 'faker';
import { INestApplication } from '@nestjs/common';
jest.mock('../../../service/iupdateService.interface');
jest.mock('../../../service/user/update-user-service/update-user.service');
jest.mock('../../../../infra/database/repository/user.repository');

describe('UpdateUserOperation', () => {
  let app: INestApplication;

  let updateUserOperation: UpdateUserOperation;
  let updateUserService: IUpdateService<User>;
  let repository: IRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
      providers: [
        {
          provide: 'IUpdateService',
          useClass: UpdateUserService,
        },
        UpdateUserOperation,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    updateUserOperation = module.get(UpdateUserOperation);
    updateUserService = module.get('IUpdateService');
    repository = module.get(UserRepository);
  });

  it('should be defined', async () => {
    expect(updateUserOperation).toBeDefined();
    expect(updateUserService).toBeDefined();
    expect(repository).toBeDefined();

    const firstName = faker?.name.firstName();
    const lastName = faker?.name.lastName();
    const id = faker?.datatype.number();
    const testUsers = {
      firstName: firstName,
      lastName: lastName,
      password: faker?.internet.password(),
    };

    updateUserOperation.updateData = jest.fn().mockReturnValue(testUsers);
    const result = await updateUserOperation.updateData(testUsers, id);
    const resultData = {
      ...testUsers,
      ...{ fullName: `${firstName} ${lastName}` },
    };

    jest
      .spyOn(updateUserService, 'update')
      .mockImplementation(() => Promise.resolve(resultData));
    jest
      .spyOn(repository, 'editData')
      .mockImplementation(() => Promise.resolve(resultData));

    expect(await updateUserService.update(1, resultData)).toBe(resultData);
    expect(await repository.editData(1, resultData)).toBe(resultData);
    expect(result).toEqual(testUsers);
  });

  it('update user', async () => {
    const firstName = faker?.name.firstName();
    const lastName = faker?.name.lastName();
    const id = faker?.datatype.number();
    const testUsers = {
      firstName: 'teste',
      lastName: 'teste 2',
      password: '123456',
    };

    const resultData = {
      ...testUsers,
      ...{ fullName: `${firstName} ${lastName}` },
    };

    updateUserOperation.updateData = jest.fn().mockReturnValue(testUsers);
    const result = await updateUserOperation.updateData(testUsers, id);

    jest
      .spyOn(updateUserService, 'update')
      .mockImplementation(() => Promise.resolve(resultData));
    jest
      .spyOn(repository, 'editData')
      .mockImplementation(() => Promise.resolve(resultData));

    expect(await updateUserService.update(id, resultData)).toBe(resultData);
    expect(await repository.editData(id, resultData)).toBe(resultData);
    expect(result).toEqual(testUsers);
    expect(updateUserOperation.updateData).toHaveBeenCalled();
    expect(updateUserService.update).toHaveBeenCalled();
    expect(repository.editData).toHaveBeenCalled();
  });
});
