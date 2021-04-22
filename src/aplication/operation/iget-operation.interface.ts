export interface IGetOperation<T> {
  getData(userId: number): Promise<T>;
}
