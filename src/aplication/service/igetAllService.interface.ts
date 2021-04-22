export interface IGetAllService<T> {
  findAll(): Promise<T[]>;
}
