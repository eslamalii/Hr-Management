import { Department } from '@prisma/client'
import { User } from '../../types'

export interface IUserRepository {
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
  update(id: number, data: Partial<User>): Promise<Partial<User>>
  delete(id: number): Promise<void>
  findById(id: number): Promise<User | null>
  updatePassword(userId: number, hashedPassword: string): Promise<void>
  findByEmail(email: string): Promise<User | null>
  updateAnnualLeaveBalance(userId: number, amount: number): Promise<void>
  updateMonthlyHourBalance(userId: number, hours: number): Promise<void>
  findAll(
    page: number,
    limit: number,
    filters?: Record<string, any>,
    sort?: Record<string, 'asc' | 'desc'>
  ): Promise<{
    data: Pick<User, 'id' | 'name' | 'profileImageUrl'>[]
    total: number
    page: number
    totalPages: number
  }>
  findUserRequests(
    id: number,
    page: number,
    limit: number
  ): Promise<{
    user: Pick<User, 'id' | 'name'> | null
    requests: {
      requestDate: Date
      startDate?: Date
      endDate?: Date
      requestedDays?: number
      date?: Date
      requestedHours?: number
      status: string
    }[]
    page: number
    totalPages: number
  }>
  departmentExists(id: number): Promise<boolean>
  getDepartments(): Promise<Department[]>
}
