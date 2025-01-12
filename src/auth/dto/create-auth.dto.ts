import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export enum UserRoles {
  USER = 'user',
  ADMIN = 'ADMIN',
}

export class CreateAuthDto {
  @ApiProperty({ example: 'g.muruga1706@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'rohit45##G' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreateRegistrationDto {
  @ApiProperty({ example: 'muruganantham' })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ example: 'g.muruga1706@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '8220909225' })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IN')
  mobile: string;

  @ApiProperty({ example: 'rohit45##G' })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  password: string;
}
