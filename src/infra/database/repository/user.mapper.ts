import { User as UserDomain } from '../../../domain/entities/user/user.entity';
import { User as UserEntity } from '../entity/user.entity';
export class UserMapper {
  public static toEntity(databaseObject: UserEntity): UserDomain {
    const { id, firstName, lastName, password, isActive } = databaseObject;
    return new UserDomain({ id, firstName, lastName, password, isActive });
  }

  public static toDatabase(domainEntity: UserDomain): UserEntity {
    const { id, firstName, lastName, password, isActive } = domainEntity;
    return new UserEntity({ id, firstName, lastName, password, isActive });
  }
}
