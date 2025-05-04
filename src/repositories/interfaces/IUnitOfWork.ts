export interface IUnitOfWork {
  beginTransaction(): Promise<void>
  commitTransaction(): Promise<void>
  rollbackTransaction(): Promise<void>

  executeInTransaction<T>(
    workFunction: (uow: IUnitOfWork) => Promise<T>
  ): Promise<T>
}
