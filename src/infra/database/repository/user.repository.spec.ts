import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { IRepository } from './IRepository.interface';
import { User } from '../entity/user.entity';
import faker from 'faker';

describe('UserRepository', () => {
  let repository: IRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
    }).compile();

    repository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  it('get users', async () => {
    const firstName = faker?.name.firstName();
    const lastName = faker?.name.lastName();
    const id = faker?.datatype.number();
    const testUsers = {
      firstName: firstName,
      lastName: lastName,
      password: faker?.internet.password(),
    };

    const resultData = {
      ...testUsers,
      ...{ fullName: `${firstName} ${lastName}` },
    };

    repository.findById = jest.fn().mockReturnValue(resultData);
    const result = await repository.findById(id);

    expect(result).toEqual(resultData);

    expect(repository.findById).toHaveBeenCalled();
  });

  it('get all users', async () => {
    const firstName = faker?.name.firstName();
    const lastName = faker?.name.lastName();
    const testUsers = {
      firstName: firstName,
      lastName: lastName,
      password: faker?.internet.password(),
    };

    const resultData = [
      {
        ...testUsers,
        ...{ fullName: `${firstName} ${lastName}` },
      },
    ];

    repository.findAll = jest.fn().mockReturnValue(resultData);
    const result = await repository.findAll();

    expect(result).toEqual(resultData);

    expect(repository.findAll).toHaveBeenCalled();
  });

  it('create new user', async () => {
    const firstName = faker?.name.firstName();
    const lastName = faker?.name.lastName();
    const testUsers = {
      firstName: firstName,
      lastName: lastName,
      password: faker?.internet.password(),
    };

    const resultData = {
      ...testUsers,
      ...{ fullName: `${firstName} ${lastName}` },
    };

    repository.createData = jest.fn().mockReturnValue(resultData);
    const result = await repository.createData(new User(testUsers));

    expect(result).toEqual(resultData);

    expect(repository.createData).toHaveBeenCalled();
  });

  it('update new user', async () => {
    const firstName = faker?.name.firstName();
    const lastName = faker?.name.lastName();
    const id = faker?.datatype.number();
    const testUsers = {
      firstName: firstName,
      lastName: lastName,
      password: faker?.internet.password(),
    };

    const resultData = {
      ...testUsers,
      ...{ fullName: `${firstName} ${lastName}` },
    };

    repository.editData = jest.fn().mockReturnValue(resultData);
    const result = await repository.editData(id, new User(testUsers));

    expect(result).toEqual(resultData);

    expect(repository.editData).toHaveBeenCalled();
  });

  it('delete user', async () => {
    const id = faker?.datatype.number();
    repository.destroyData = jest.fn().mockReturnValue(undefined);
    await repository.destroyData(id);

    expect(await repository.destroyData(id)).toBe(undefined);
    expect(repository.destroyData).toHaveBeenCalled();
  });
});
