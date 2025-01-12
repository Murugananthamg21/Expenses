import { Module } from '@nestjs/common';
import { ExpensesTypeService } from './expenses-type.service';
import { ExpensesTypeController } from './expenses-type.controller';
import { ExpensesType } from './entities/expenses-type.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [ExpensesType] })],
  controllers: [ExpensesTypeController],
  providers: [ExpensesTypeService],
})
export class ExpensesTypeModule {}
