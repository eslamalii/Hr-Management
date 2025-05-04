import { IAttendanceRepository } from './IAttendanceRepository'
import { IHourRequestRepository } from './IHourRequestRepository'
import { ILeaveRequestRepository } from './ILeaveRequestRepository'
import { IUserRepository } from './IUserRepository'

export interface IUnitOfWork {
  getUserRepository(): IUserRepository
  getLeaveRepository(): ILeaveRequestRepository
  getHoursRepository(): IHourRequestRepository
  getAttendanceRepository(): IAttendanceRepository

  beginTransaction(): Promise<void>
  commitTransaction(): Promise<void>
  rollbackTransaction(): Promise<void>

  executeInTransaction<T>(
    workFunction: (uow: IUnitOfWork) => Promise<T>
  ): Promise<T>
}
