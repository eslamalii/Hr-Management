import { PrismaClient, Prisma } from '@prisma/client'

export interface IPrismaProvider {
  client: PrismaClient
  getTransactionClient(): Promise<Prisma.TransactionClient>
  startTransaction(): Promise<Prisma.TransactionClient>
  commitTransaction(): Promise<void>
  rollbackTransaction(): Promise<void>
  executeTransaction<T>(
    callback: (tx: Prisma.TransactionClient) => Promise<T>
  ): Promise<T>
}
