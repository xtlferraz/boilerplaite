import { Exclude, Expose } from 'class-transformer';

export class User {
  id?: number;
  firstName: string;
  lastName: string;
  isActive?: boolean;

  @Exclude()
  password: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
