import { PartialType } from '@nestjs/swagger';
import { CreateExpensesTypeDto } from './create-expenses-type.dto';

export class UpdateExpensesTypeDto extends PartialType(CreateExpensesTypeDto) {}
