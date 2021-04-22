import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import { User as UserDomain } from '../../../domain/entities/user/user.entity';
import { UserMapper } from './user.mapper';
import { Injectable } from '@nestjs/common';
import { IRepository } from './IRepository.interface';
@Injectable()
@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements IRepository<UserDomain> {
  public async findAll(): Promise<UserDomain[]> {
    const resultData = await this.find({});
    return resultData.map((result) => UserMapper.toEntity(result));
  }
  public async findById(userId: number): Promise<UserDomain> {
    const resultData = await this.findOne(userId);
    return UserMapper.toEntity(resultData);
  }

  public async createData(data: UserDomain): Promise<UserDomain> {
    const resultData = await this.save(UserMapper.toDatabase(data));
    return UserMapper.toEntity(resultData);
  }

  public async editData(userId: number, data: UserDomain): Promise<UserDomain> {
    const { id, firstName, lastName, password, isActive } = data;

    const userData = await this.findOne(userId);
    userData.id = id;
    userData.firstName = firstName;
    userData.lastName = lastName;
    userData.password = password;
    userData.isActive = isActive;
    const resultData = await this.save(
      UserMapper.toDatabase(new UserDomain(userData)),
    );
    return UserMapper.toEntity(resultData);
  }

  public async destroyData(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.remove(user);
  }
}
