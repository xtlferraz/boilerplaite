export interface ICreateService<T> {
  create(user: T): Promise<T>;
}
