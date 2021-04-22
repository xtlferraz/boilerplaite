import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/domain/entities/user/user.entity';
import { IDeleteService } from '../../ideleteService.interface';
import { DeleteUserService } from './delete-user.service';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import faker from 'faker';

jest.mock('../../../../infra/database/repository/user.repository');
jest.mock('../../../../infra/database/repository/IRepository.interface');

describe('DeleteUserService', () => {
  let deleteUserService: IDeleteService;
  let repository: IRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
      providers: [
        DeleteUserService,
        { provide: 'UserRepositoryRepository', useClass: UserRepository },
      ],
    }).compile();

    deleteUserService = module.get(DeleteUserService);
    repository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(deleteUserService).toBeDefined();
    expect(repository).toBeDefined();
  });
  it('delete user', async () => {
    const id = faker?.datatype.number();
    deleteUserService.remove = jest.fn().mockReturnValue(undefined);
    await deleteUserService.remove(id);

    jest
      .spyOn(repository, 'destroyData')
      .mockImplementation(() => Promise.resolve());
    expect(await deleteUserService.remove(id)).toBe(undefined);
    expect(await repository.destroyData(id)).toBe(undefined);
    expect(deleteUserService.remove).toHaveBeenCalled();
    expect(repository.destroyData).toHaveBeenCalled();
  });
});
