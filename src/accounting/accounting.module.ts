import { Module } from '@nestjs/common';

import { AccountingController } from './accounting.controller';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  controllers: [AccountingController],
  imports: [TransactionModule],
})
export class AccountingModule {}
