import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUserService } from './getAll-user.service';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import { User } from 'src/domain/entities/user/user.entity';
import { IGetAllService } from '../../igetAllService.interface';
import faker from 'faker';
jest.mock('../../../../infra/database/repository/user.repository');
jest.mock('../../../../infra/database/repository/IRepository.interface');

describe('GetAllUserService', () => {
  let getAllUserService: IGetAllService<User[]>;
  let repository: IRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
      providers: [
        GetAllUserService,
        { provide: 'UserRepositoryRepository', useClass: UserRepository },
      ],
    }).compile();

    getAllUserService = module.get(GetAllUserService);
    repository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(getAllUserService).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('get user all', async () => {
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

    getAllUserService.findAll = jest.fn().mockReturnValue([resultData]);
    const result = await getAllUserService.findAll();

    jest
      .spyOn(repository, 'findAll')
      .mockImplementation(() => Promise.resolve([resultData]));

    expect(await repository.findAll()).toEqual([resultData]);
    expect(result).toEqual([resultData]);
    expect(repository.findAll).toHaveBeenCalled();
  });
});
