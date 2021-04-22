import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUserOperation } from './getAll-user.operation';
import { GetAllUserService } from '../../../service/user/getAll-user-service/getAll-user.service';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { IGetAllService } from '../../../service/igetAllService.interface';
import { User } from '../../../../domain/entities/user/user.entity';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import { INestApplication } from '@nestjs/common';
import faker from 'faker';
jest.mock('../../../service/igetAllService.interface');
jest.mock('../../../service/user/getAll-user-service/getAll-user.service');
jest.mock('../../../../infra/database/repository/user.repository');

describe('GetAllUserOperation', () => {
  let app: INestApplication;

  let getAllUserOperation: GetAllUserOperation;
  let getAllUserService: IGetAllService<User>;
  let repository: IRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserRepository],
      providers: [
        {
          provide: 'IGetAllService',
          useClass: GetAllUserService,
        },
        GetAllUserOperation,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    getAllUserOperation = module.get(GetAllUserOperation);
    getAllUserService = module.get('IGetAllService');
    repository = module.get(UserRepository);
  });

  it('should be defined', async () => {
    expect(getAllUserOperation).toBeDefined();
    expect(getAllUserService).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('list all users', async () => {
    const firstName = faker?.name.firstName();
    const lastName = faker?.name.lastName();
    const testUsers = [
      {
        id: faker?.datatype.number(),
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        password: faker?.internet.password(),
      },
    ];

    getAllUserOperation.getAllData = jest.fn().mockReturnValue(testUsers);

    jest
      .spyOn(getAllUserService, 'findAll')
      .mockImplementation(() => Promise.resolve(testUsers));
    jest
      .spyOn(repository, 'findAll')
      .mockImplementation(() => Promise.resolve(testUsers));

    const result = await getAllUserOperation.getAllData();

    expect(await getAllUserService.findAll()).toBe(testUsers);
    expect(await repository.findAll()).toBe(testUsers);
    expect(result).toEqual(testUsers);
    expect(getAllUserOperation.getAllData).toHaveBeenCalled();
    expect(getAllUserService.findAll).toHaveBeenCalled();
    expect(repository.findAll).toHaveBeenCalled();
  });
});
