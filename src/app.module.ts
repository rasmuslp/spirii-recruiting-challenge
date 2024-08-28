import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AccountingModule } from './accounting/accounting.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [UserModule, AccountingModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
