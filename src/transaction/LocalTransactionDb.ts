import { Transaction } from './interfaces/Transaction.interface';

const transactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    createdAt: '2024-08-28T14:15:00.000Z',
    type: 'earned',
    amount: 100,
  },
  {
    id: '2',
    userId: '1',
    createdAt: '2024-08-28T14:16:00.000Z',
    type: 'spent',
    amount: 20,
  },
  {
    id: '3',
    userId: '1',
    createdAt: '2024-08-28T14:17:00.000Z',
    type: 'earned',
    amount: 1000,
  },
  {
    id: '4',
    userId: '1',
    createdAt: '2024-08-28T14:18:00.000Z',
    type: 'payout',
    amount: 500,
  },
  {
    id: '5',
    userId: '1',
    createdAt: '2024-08-28T14:19:00.000Z',
    type: 'paidOut',
    amount: 500,
  },
  {
    id: '6',
    userId: '1',
    createdAt: '2024-08-28T14:20:00.000Z',
    type: 'payout',
    amount: 500,
  },
  {
    id: '100',
    userId: '2',
    createdAt: '2024-08-28T14:21:00.000Z',
    type: 'earned',
    amount: 100,
  },
  {
    id: '101',
    userId: '2',
    createdAt: '2024-08-28T14:22:00.000Z',
    type: 'payout',
    amount: 50,
  },
  {
    id: '102',
    userId: '2',
    createdAt: '2024-08-28T14:23:00.000Z',
    type: 'paidOut',
    amount: 50,
  },
];

/*
 * In a real world scenario, we would probably either let the DB
 * handle the aggregation, or do pagination on the returned transactions.
 */
export class LocalTransactionDb {
  private readonly payoutProcessingTypes = ['payout', 'paidOut'];

  getTransactionsForUser(id: string): Transaction[] {
    return transactions.filter((transaction) => transaction.userId === id);
  }

  getTransactionsForPayoutProcessing(): Transaction[] {
    return transactions.filter((transaction) =>
      this.payoutProcessingTypes.includes(transaction.type),
    );
  }
}
