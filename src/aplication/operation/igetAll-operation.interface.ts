export interface IGetAllOperation<T> {
  getAllData(): Promise<T[]>;
}
