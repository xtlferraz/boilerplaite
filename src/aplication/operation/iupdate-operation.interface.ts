export interface IUpdateOperation<D, T> {
  updateData(data: D, userId: number): Promise<T>;
}
