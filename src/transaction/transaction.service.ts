import { Injectable } from '@nestjs/common';
import { LocalTransactionDb } from './LocalTransactionDb';

@Injectable()
export class TransactionService {
  private readonly localTransactionDb: LocalTransactionDb;

  constructor() {
    this.localTransactionDb = new LocalTransactionDb();
  }

  getUserAggregate(id: string) {
    const transactions = this.localTransactionDb.getTransactionsForUser(id);

    const aggregate = {
      userId: id,
      balance: 0,
      earned: 0,
      spent: 0,
      payout: 0,
      paidOut: 0,
    };

    for (const transaction of transactions) {
      switch (transaction.type) {
        case 'earned': {
          aggregate.balance += transaction.amount;
          aggregate.earned += transaction.amount;
          break;
        }

        case 'spent': {
          aggregate.balance -= transaction.amount;
          aggregate.spent += transaction.amount;
          break;
        }

        case 'payout': {
          aggregate.payout += transaction.amount;
          break;
        }

        case 'paidOut': {
          aggregate.balance -= transaction.amount;
          aggregate.paidOut += transaction.amount;
          break;
        }
      }
    }

    return aggregate;
  }

  getRequestedPayouts() {
    const transactions =
      this.localTransactionDb.getTransactionsForPayoutProcessing();

    const userIdPendingPayout: Record<string, number> = {};
    for (const transaction of transactions) {
      if (!(transaction.userId in userIdPendingPayout)) {
        userIdPendingPayout[transaction.userId] = 0;
      }

      switch (transaction.type) {
        case 'payout': {
          userIdPendingPayout[transaction.userId] += transaction.amount;
          break;
        }

        case 'paidOut': {
          userIdPendingPayout[transaction.userId] -= transaction.amount;
          break;
        }
      }
    }

    const payoutsToProcess = [];
    for (const [userId, amount] of Object.entries(userIdPendingPayout)) {
      payoutsToProcess.push({
        userId,
        amount,
      });
    }

    return payoutsToProcess;
  }
}
