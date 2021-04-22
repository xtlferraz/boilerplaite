import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { AplicationModule } from '../../../../aplication/aplication.module';
import { UserRepository } from '../../../../infra/database/repository/user.repository';
import { CreateUserOperation } from '../../../../aplication/operation/user/create-user-operation/create-user.operation';
import { GetAllUserOperation } from '../../../../aplication/operation/user/getAll-user-operation/getAll-user.operation';
import { DeleteUserOperation } from '../../../../aplication/operation/user/delete-user-operation/delete-user.operation';
import { GetUserOperation } from '../../../../aplication/operation/user/get-user-operation/get-user.operation';
import { UpdateUserOperation } from '../../../../aplication/operation/user/update-user-operation/update-user.operation';
import { CreateUserService } from '../../../../aplication/service/user/create-user-service/create-user.service';
import { GetUserService } from '../../../../aplication/service/user/get-user-service/get-user.service';
import { UpdateUserService } from '../../../../aplication/service/user/update-user-service/update-user.service';
import { GetAllUserService } from '../../../../aplication/service/user/getAll-user-service/getAll-user.service';
import { DeleteUserService } from '../../../../aplication/service/user/delete-user-service/delete-user.service';
import { IGetService } from '../../../../aplication/service/igetService.interface';
import { User } from 'src/domain/entities/user/user.entity';
import { IRepository } from '../../../../infra/database/repository/IRepository.interface';
import { ICreateService } from '../../../../aplication/service/icreteService.interface';
import { IGetAllService } from '../../../../aplication/service/igetAllService.interface';
import { IUpdateService } from '../../../../aplication/service/iupdateService.interface';
import { IDeleteService } from '../../../../aplication/service/ideleteService.interface';
import faker from 'faker';
jest.mock('../../../../aplication/aplication.module');
jest.mock(
  '../../../../aplication/operation/user/create-user-operation/create-user.operation',
);
jest.mock(
  '../../../../aplication/operation/user/getAll-user-operation/getAll-user.operation',
);

jest.mock('../../../../infra/database/repository/user.repository');

jest.mock(
  '../../../../aplication/service/user/create-user-service/create-user.service',
);
jest.mock(
  '../../../../aplication/service/user/get-user-service/get-user.service',
);
jest.mock(
  '../../../../aplication/service/user/update-user-service/update-user.service',
);
jest.mock(
  '../../../../aplication/service/user/getAll-user-service/getAll-user.service',
);
jest.mock(
  '../../../../aplication/service/user/delete-user-service/delete-user.service',
);

describe('UserController', () => {
  let controller: UserController;
  let getUserOperation: GetUserOperation;
  let getUserService: IGetService<User>;
  let repository: IRepository<User>;
  let createUserOperation: CreateUserOperation;
  let createUserService: ICreateService<User>;
  let getAllUserOperation: GetAllUserOperation;
  let getAllUserService: IGetAllService<User>;
  let updateUserOperation: UpdateUserOperation;
  let updateUserService: IUpdateService<User>;
  let deleteUserOperation: DeleteUserOperation;
  let deleteUserService: IDeleteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AplicationModule, UserRepository],
      providers: [
        {
          provide: 'ICreateOperation',
          useClass: CreateUserOperation,
        },
        {
          provide: 'IGetAllOperation',
          useClass: GetAllUserOperation,
        },
        {
          provide: 'IDeleteOperation',
          useClass: DeleteUserOperation,
        },
        {
          provide: 'IGetOperation',
          useClass: GetUserOperation,
        },
        {
          provide: 'IUpdateOperation',
          useClass: UpdateUserOperation,
        },
        {
          provide: 'ICreateService',
          useClass: CreateUserService,
        },
        {
          provide: 'IGetService',
          useClass: GetUserService,
        },
        {
          provide: 'IUpdateService',
          useClass: UpdateUserService,
        },
        {
          provide: 'IGetAllService',
          useClass: GetAllUserService,
        },
        {
          provide: 'IDeleteService',
          useClass: DeleteUserService,
        },
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get(UserController);
    getUserOperation = module.get('IGetOperation');
    getUserService = module.get('IGetService');
    createUserOperation = module.get('ICreateOperation');
    createUserService = module.get('ICreateService');
    getAllUserOperation = module.get('IGetAllOperation');
    getAllUserService = module.get('IGetAllService');
    updateUserOperation = module.get('IUpdateOperation');
    updateUserService = module.get('IUpdateService');
    deleteUserOperation = module.get('IDeleteOperation');
    deleteUserService = module.get('IDeleteService');
    repository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(getUserOperation).toBeDefined();
    expect(getUserService).toBeDefined();
    expect(getAllUserOperation).toBeDefined();
    expect(getAllUserService).toBeDefined();
    expect(updateUserOperation).toBeDefined();
    expect(updateUserService).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('get User', async () => {
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
    controller.getById = jest.fn().mockReturnValue(testUsers);

    const result = await controller.getById(id);

    jest
      .spyOn(getUserOperation, 'getData')
      .mockImplementation(() => Promise.resolve(testUsers));

    jest
      .spyOn(getUserService, 'findOne')
      .mockImplementation(() => Promise.resolve(testUsers));
    jest
      .spyOn(repository, 'findById')
      .mockImplementation(() => Promise.resolve(testUsers));

    expect(await getUserOperation.getData(id)).toBe(testUsers);

    expect(await getUserService.findOne(id)).toBe(testUsers);

    expect(await repository.findById(id)).toBe(testUsers);

    expect(result).toEqual(testUsers);
    expect(getUserOperation.getData).toHaveBeenCalled();
    expect(getUserService.findOne).toHaveBeenCalled();
    expect(repository.findById).toHaveBeenCalled();
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

    controller.create = jest.fn().mockReturnValue(testUsers);

    const result = await controller.create(testUsers);

    jest
      .spyOn(createUserOperation, 'createData')
      .mockImplementation(() => Promise.resolve(resultData));

    jest
      .spyOn(createUserService, 'create')
      .mockImplementation(() => Promise.resolve(resultData));
    jest
      .spyOn(repository, 'createData')
      .mockImplementation(() => Promise.resolve(resultData));

    expect(await createUserOperation.createData(resultData)).toBe(resultData);
    expect(await createUserService.create(resultData)).toBe(resultData);
    expect(await repository.createData(resultData)).toBe(resultData);
    expect(result).toEqual(testUsers);
    expect(createUserOperation.createData).toHaveBeenCalled();
    expect(createUserService.create).toHaveBeenCalled();
    expect(repository.createData).toHaveBeenCalled();
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

    controller.getAll = jest.fn().mockReturnValue(testUsers);

    jest
      .spyOn(getAllUserOperation, 'getAllData')
      .mockImplementation(() => Promise.resolve(testUsers));

    jest
      .spyOn(getAllUserService, 'findAll')
      .mockImplementation(() => Promise.resolve(testUsers));

    jest
      .spyOn(repository, 'findAll')
      .mockImplementation(() => Promise.resolve(testUsers));

    const result = await controller.getAll();
    expect(await getAllUserOperation.getAllData()).toBe(testUsers);
    expect(await getAllUserService.findAll()).toBe(testUsers);
    expect(await repository.findAll()).toBe(testUsers);
    expect(result).toEqual(testUsers);
    expect(getAllUserOperation.getAllData).toHaveBeenCalled();
    expect(getAllUserService.findAll).toHaveBeenCalled();
    expect(repository.findAll).toHaveBeenCalled();
  });
  it('update user', async () => {
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

    controller.update = jest.fn().mockReturnValue(testUsers);
    const result = await controller.update(testUsers, id);

    jest
      .spyOn(updateUserOperation, 'updateData')
      .mockImplementation(() => Promise.resolve(resultData));

    jest
      .spyOn(updateUserService, 'update')
      .mockImplementation(() => Promise.resolve(resultData));
    jest
      .spyOn(repository, 'editData')
      .mockImplementation(() => Promise.resolve(resultData));

    expect(await updateUserOperation.updateData(resultData, id)).toBe(
      resultData,
    );
    expect(await updateUserService.update(id, resultData)).toBe(resultData);
    expect(await repository.editData(id, resultData)).toBe(resultData);
    expect(result).toEqual(testUsers);
    expect(updateUserOperation.updateData).toHaveBeenCalled();
    expect(updateUserService.update).toHaveBeenCalled();
    expect(repository.editData).toHaveBeenCalled();
  });

  it('delete user', async () => {
    const id = faker?.datatype.number();
    controller.delete = jest.fn().mockReturnValue({});
    await controller.delete(id);

    jest
      .spyOn(deleteUserOperation, 'delete')
      .mockImplementation(() => Promise.resolve());

    jest
      .spyOn(deleteUserService, 'remove')
      .mockImplementation(() => Promise.resolve());
    jest
      .spyOn(repository, 'destroyData')
      .mockImplementation(() => Promise.resolve());

    expect(await deleteUserOperation.delete(id)).toBe(undefined);
    expect(await deleteUserService.remove(id)).toBe(undefined);
    expect(await repository.destroyData(id)).toBe(undefined);
    expect(deleteUserOperation.delete).toHaveBeenCalled();
    expect(deleteUserService.remove).toHaveBeenCalled();
    expect(repository.destroyData).toHaveBeenCalled();
  });
});
