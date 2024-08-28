import { Module } from '@nestjs/common';
import { AccountingModule } from './accounting/accounting.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AccountingModule, TransactionModule, UserModule],
})
export class AppModule {}
