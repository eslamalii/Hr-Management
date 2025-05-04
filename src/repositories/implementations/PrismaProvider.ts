import { Prisma, PrismaClient } from '@prisma/client'
import { IPrismaProvider } from '../interfaces/IPrismaProvider'
import prisma from '../../lib/prisma'
import logger from '../../config/logger'
import { injectable } from 'inversify'

@injectable()
export class PrismaProvider implements IPrismaProvider {
  private txClient: Prisma.TransactionClient | null = null
  public client: PrismaClient

  constructor() {
    this.client = prisma
  }

  async getTransactionClient(): Promise<Prisma.TransactionClient> {
    if (!this.txClient) {
      throw new Error('Transaction client is not initialized')
    }

    return this.txClient
  }

  async startTransaction(): Promise<Prisma.TransactionClient> {
    if (this.txClient) {
      throw new Error('Transaction already started')
    }

    this.txClient = await this.client.$transaction(
      async (tx) => {
        return tx
      },
      {
        maxWait: 5000,
        timeout: 10000,
        isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
      }
    )

    logger.info('Transaction started')
    return this.txClient
  }

  async commitTransaction(): Promise<void> {
    this.txClient = null
    logger.info('Transaction committed')
  }

  async rollbackTransaction(): Promise<void> {
    this.txClient = null
    logger.info('Transaction rolled back')
  }

  async executeTransaction<T>(
    callback: (tx: Prisma.TransactionClient) => Promise<T>
  ): Promise<T> {
    return this.client.$transaction(async (tx) => {
      return await callback(tx)
    })
  }
}
