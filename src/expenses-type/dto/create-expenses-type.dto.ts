import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExpensesTypeDto {
  @ApiProperty({ example: 'Tea' })
  @IsString()
  @IsNotEmpty()
  expensesType: string;
}
