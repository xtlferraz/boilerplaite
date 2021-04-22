import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserOperation } from './create-user.operation';
import { CreateUserService } from '../../../service/user/create-user-service/create-user.service';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { ICreateService } from '../../../service/icreteService.interface';
import { User } from '../../../../domain/entities/user/user.entity';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import faker from 'faker';

jest.mock('../../../service/icreteService.interface');
jest.mock('../../../service/user/create-user-service/create-user.service');
jest.mock('../../../../infra/database/repository/user.repository');

describe('CreateUserOperation', () => {
  let createUserOperation: CreateUserOperation;
  let createUserService: ICreateService<User>;
  let repository: IRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
      providers: [
        CreateUserOperation,
        {
          provide: 'ICreateService',
          useClass: CreateUserService,
        },
      ],
    }).compile();

    createUserOperation = module.get(CreateUserOperation);
    createUserService = module.get('ICreateService');
    repository = module.get(UserRepository);
  });

  it('should be defined', async () => {
    expect(createUserOperation).toBeDefined();
    expect(createUserService).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('create user', async () => {
    const firstName = faker?.name.firstName();
    const lastName = faker?.name.lastName();
    const testUsers = {
      firstName: firstName,
      lastName: lastName,
      password: faker?.internet.password(),
    };

    createUserOperation.createData = jest.fn().mockReturnValue(testUsers);
    const result = await createUserOperation.createData(testUsers);
    const resultData = {
      ...testUsers,
      ...{ fullName: `${firstName} ${lastName}` },
    };

    jest
      .spyOn(createUserService, 'create')
      .mockImplementation(() => Promise.resolve(resultData));
    jest
      .spyOn(repository, 'createData')
      .mockImplementation(() => Promise.resolve(resultData));

    expect(await createUserService.create(resultData)).toBe(resultData);
    expect(await repository.createData(resultData)).toBe(resultData);
    expect(result).toEqual(testUsers);
  });

  it('create new user', async () => {
    const firstName = faker?.name.firstName();
    const lastName = faker?.name.lastName();
    const testUsers = {
      firstName: firstName,
      lastName: lastName,
      password: faker?.internet.password(),
    };

    createUserOperation.createData = jest.fn().mockReturnValue(testUsers);
    const result = await createUserOperation.createData(testUsers);
    const resultData = {
      ...testUsers,
      ...{ fullName: `${firstName} ${lastName}` },
    };

    jest
      .spyOn(createUserService, 'create')
      .mockImplementation(() => Promise.resolve(resultData));
    jest
      .spyOn(repository, 'createData')
      .mockImplementation(() => Promise.resolve(resultData));

    expect(await createUserService.create(resultData)).toBe(resultData);
    expect(await repository.createData(resultData)).toBe(resultData);
    expect(result).toEqual(testUsers);
    expect(createUserOperation.createData).toHaveBeenCalled();
    expect(createUserService.create).toHaveBeenCalled();
    expect(repository.createData).toHaveBeenCalled();
  });
});
