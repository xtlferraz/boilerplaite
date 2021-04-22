export interface IGetService<T> {
  findOne(userId: number): Promise<T>;
}
