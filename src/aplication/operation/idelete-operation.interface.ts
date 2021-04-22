export interface IDeleteOperation {
  delete(id: number): Promise<void>;
}
