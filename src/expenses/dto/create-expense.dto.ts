import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsInt, Min, Max } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: '01-01-2024' })
  @IsString()
  date: string;

  @ApiProperty({ example: 'tea' })
  @IsString()
  expense: string;

  @ApiProperty({ example: 'hashOn hand' })
  @IsString()
  payamentMathod: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'some thing !' })
  @IsString()
  @IsOptional()
  notes: string;
}

export class FindAllDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsString()
  search: string;
}
