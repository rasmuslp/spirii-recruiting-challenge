import { Transaction } from './interfaces/Transaction.interface';

const externalTransactions: Transaction[] = [
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
 * As we are very limited in the amount of requests to the Transactions API, we need to maximise
 * what we can get. If we could compute and communicate instantly, we should make 10 requests
 * every 2 minutes.
 *
 * Imagine fancy retry logic and more here...
 */

// function transactionsApi(since: string): Transaction[] {
//   const timestamp = new Date(since);

//   const indexOfNextTransaction = externalTransactions.findIndex(
//     (item) => new Date(item.createdAt) > timestamp,
//   );
//   const maxIndexInThisRequest = Math.min(
//     indexOfNextTransaction + 3,
//     externalTransactions.length,
//   );

//   const toReturn = [];
//   for (let i = indexOfNextTransaction; i < maxIndexInThisRequest; i++) {
//     toReturn.push(externalTransactions[i]);
//   }

//   return toReturn;
// }

// const internalTransactions: Transaction[] = [];
// function getMoreTransactions() {
//   const latestTransaction = internalTransactions.slice(-1)[0];
//   const latestTimestamp = latestTransaction?.createdAt ?? 0;

//   const moreTransactions = transactionsApi(latestTimestamp);
//   internalTransactions.push(...moreTransactions);
// }

// /*
//  * Here we would run logic once every 60 (or close to 120) seconds or
//  * so to maximise the data we can get from the TransactionsAPI.
//  */
// getMoreTransactions();
// setInterval(getMoreTransactions, 2000);

const internalTransactions = externalTransactions;
/*
 * In a real world scenario, we would probably either let the DB
 * handle the aggregation, or do pagination on the returned transactions.
 */
export class LocalTransactionDb {
  private readonly payoutProcessingTypes = ['payout', 'paidOut'];

  getTransactionsForUser(id: string): Transaction[] {
    return internalTransactions.filter(
      (transaction) => transaction.userId === id,
    );
  }

  getTransactionsForPayoutProcessing(): Transaction[] {
    return internalTransactions.filter((transaction) =>
      this.payoutProcessingTypes.includes(transaction.type),
    );
  }
}
