import { Test, TestingModule } from '@nestjs/testing';
import { GetUserService } from './get-user.service';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import { IGetService } from '../../igetService.interface';
import { User } from 'src/domain/entities/user/user.entity';
import faker from 'faker';
jest.mock('../../../../infra/database/repository/user.repository');
jest.mock('../../../../infra/database/repository/IRepository.interface');

describe('GetUserService', () => {
  let getUserService: IGetService<User>;
  let repository: IRepository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
      providers: [
        GetUserService,
        { provide: 'UserRepositoryRepository', useClass: UserRepository },
      ],
    }).compile();

    getUserService = module.get(GetUserService);
    repository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(getUserService).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('get user', async () => {
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

    getUserService.findOne = jest.fn().mockReturnValue(testUsers);
    const result = await getUserService.findOne(id);

    jest
      .spyOn(repository, 'findById')
      .mockImplementation(() => Promise.resolve(resultData));

    expect(await repository.findById(id)).toBe(resultData);
    expect(result).toEqual(testUsers);
    expect(repository.findById).toHaveBeenCalled();
  });
});
