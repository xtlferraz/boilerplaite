import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserService } from './update-user.service';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import { IUpdateService } from '../../iupdateService.interface';
import { User } from 'src/domain/entities/user/user.entity';
import faker from 'faker';
jest.mock('../../../../infra/database/repository/user.repository');
jest.mock('../../../../infra/database/repository/IRepository.interface');

describe('UpdateUserService', () => {
  let getAllUserService: IUpdateService<User>;
  let repository: IRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
      providers: [
        UpdateUserService,
        { provide: 'UserRepositoryRepository', useClass: UserRepository },
      ],
    }).compile();

    getAllUserService = module.get(UpdateUserService);
    repository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(getAllUserService).toBeDefined();
    expect(repository).toBeDefined();
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

    getAllUserService.update = jest.fn().mockReturnValue(resultData);
    const result = await getAllUserService.update(id, resultData);

    jest
      .spyOn(repository, 'editData')
      .mockImplementation(() => Promise.resolve(resultData));

    expect(await repository.editData(id, resultData)).toBe(resultData);
    expect(result).toEqual(resultData);
    expect(repository.editData).toHaveBeenCalled();
  });
});
