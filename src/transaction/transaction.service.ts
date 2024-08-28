import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  getUserAggregate(id: string) {
    return {
      userId: id,
      balance: 2,
      earned: 3,
      spent: 4,
      payout: 5,
      paidOut: 6,
    };
  }

  getRequestedPayouts() {
    // Diff between 'payout' and 'paid out'
    return [
      {
        userId: '1',
        payout: -1,
      },
    ];
  }
}
