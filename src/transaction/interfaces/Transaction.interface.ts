type TransactionType = 'earned' | 'spent' | 'payout' | 'paidOut';

export interface Transaction {
  id: string;
  userId: string;
  createdAt: string;
  type: TransactionType;
  amount: number;
}
