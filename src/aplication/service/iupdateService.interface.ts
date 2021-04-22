export interface IUpdateService<T> {
  update(userId: number, user: T): Promise<T>;
}
