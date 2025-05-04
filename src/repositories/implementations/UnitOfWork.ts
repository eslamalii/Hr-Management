import { inject, injectable } from 'inversify'
import { IUnitOfWork } from '../interfaces/IUnitOfWork'
import { TYPES } from '../../config/types'
import { IPrismaProvider } from '../interfaces/IPrismaProvider'
import { IUserRepository } from '../interfaces/IUserRepository'
import { ILeaveRequestRepository } from '../interfaces/ILeaveRequestRepository'
import { IHourRequestRepository } from '../interfaces/IHourRequestRepository'
import { IAttendanceRepository } from '../interfaces/IAttendanceRepository'
import logger from '../../config/logger'

@injectable()
export class UnitOfWork implements IUnitOfWork {
  private isTransactionActive: boolean = false

  constructor(
    @inject(TYPES.PrismaProvider) private prismaProvider: IPrismaProvider,
    @inject(TYPES.UserRepository) private userRepository: IUserRepository,
    @inject(TYPES.LeaveRequestRepository)
    private leaveRequestRepository: ILeaveRequestRepository,
    @inject(TYPES.HourRequestRepository)
    private hourRequestRepository: IHourRequestRepository,
    @inject(TYPES.AttendanceRepository)
    private attendanceRepository: IAttendanceRepository
  ) {}

  getUserRepository(): IUserRepository {
    return this.userRepository
  }

  getLeaveRepository(): ILeaveRequestRepository {
    return this.leaveRequestRepository
  }

  getHoursRepository(): IHourRequestRepository {
    return this.hourRequestRepository
  }

  getAttendanceRepository(): IAttendanceRepository {
    return this.attendanceRepository
  }

  async beginTransaction(): Promise<void> {
    if (this.isTransactionActive) {
      throw new Error('Transaction already started')
    }

    await this.prismaProvider.startTransaction()
    this.isTransactionActive = true
    logger.info('UnitOfWork: Transaction started')
  }

  async commitTransaction(): Promise<void> {
    if (!this.isTransactionActive) {
      throw new Error('No transaction started')
    }

    await this.prismaProvider.commitTransaction()
    this.isTransactionActive = false
    logger.info('UnitOfWork: Transaction committed')
  }

  async rollbackTransaction(): Promise<void> {
    if (!this.isTransactionActive) {
      throw new Error('No transaction started')
    }

    await this.prismaProvider.rollbackTransaction()
    this.isTransactionActive = false
    logger.info('UnitOfWork: Transaction rolled back')
  }

  async executeInTransaction<T>(
    workFunction: (uow: IUnitOfWork) => Promise<T>
  ): Promise<T> {
    const transactionStarted = this.isTransactionActive

    if (!transactionStarted) {
      await this.beginTransaction()
    }

    try {
      const result = await workFunction(this)

      if (!transactionStarted) {
        await this.commitTransaction()
      }
      return result
    } catch (error) {
      if (!transactionStarted) {
        await this.rollbackTransaction()
      }
      throw error
    }
  }
}
