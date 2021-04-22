export interface ICreateOperation<D, T> {
  createData(data: D): Promise<T>;
}
