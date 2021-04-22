export interface IDeleteService {
  remove(userId: number): Promise<void>;
}
