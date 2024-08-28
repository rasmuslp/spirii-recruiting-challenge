import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  controllers: [UserController],
  imports: [TransactionModule],
})
export class UserModule {}
