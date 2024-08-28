import { Controller, Get } from '@nestjs/common';
import { TransactionService } from 'src/transaction/transaction.service';

@Controller('accounting')
export class AccountingController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('requested-payouts')
  getRequestedPayouts() {
    return this.transactionService.getRequestedPayouts();
  }
}
