export interface IEntityController<D, T> {
  create(data: D): Promise<T>;
  getById(id: number): Promise<T>;
  getAll(): Promise<T[]>;
  update(data: D, id: number): Promise<T>;
  delete(id: number): Promise<void>;
}
