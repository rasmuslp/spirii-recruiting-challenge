import { Controller, Get, Param } from '@nestjs/common';
import { TransactionService } from 'src/transaction/transaction.service';

@Controller('user')
export class UserController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.getUserAggregate(id);
  }
}
