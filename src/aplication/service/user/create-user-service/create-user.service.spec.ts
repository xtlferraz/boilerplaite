import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { ICreateService } from '../../icreteService.interface';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import { User } from 'src/domain/entities/user/user.entity';
import faker from 'faker';

jest.mock('../../../../infra/database/repository/user.repository');
jest.mock('../../../../infra/database/repository/IRepository.interface');

describe('CreateUserService', () => {
  let createUserService: ICreateService<User>;
  let repository: IRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
      providers: [
        CreateUserService,
        { provide: 'UserRepositoryRepository', useClass: UserRepository },
      ],
    }).compile();

    createUserService = module.get(CreateUserService);
    repository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(createUserService).toBeDefined();
    expect(repository).toBeDefined();
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

    createUserService.create = jest.fn().mockReturnValue(resultData);
    const result = await createUserService.create(resultData);

    jest
      .spyOn(repository, 'createData')
      .mockImplementation(() => Promise.resolve(resultData));

    expect(await createUserService.create(resultData)).toBe(resultData);
    expect(await repository.createData(resultData)).toBe(resultData);
    expect(result).toEqual(resultData);

    expect(createUserService.create).toHaveBeenCalled();
    expect(repository.createData).toHaveBeenCalled();
  });
});
