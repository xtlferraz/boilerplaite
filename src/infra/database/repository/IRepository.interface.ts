export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T>;
  createData(data: T): Promise<T>;
  editData(userId: number, data: T): Promise<T>;
  destroyData(id: number): Promise<void>;
}
