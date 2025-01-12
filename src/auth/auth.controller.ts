import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, CreateRegistrationDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    try {
      const user = await this.authService.validateUser(
        createAuthDto.email,
        createAuthDto.password,
      );
      if (!user) {
        throw new BadRequestException('Invalid credentials');
      }
      return this.authService.login(user);
    } catch (e) {
      if (e instanceof BadRequestException) throw e;
      throw new InternalServerErrorException(e.message);
    }
  }

  @Post('sign-up')
  async register(@Body() createAuthDto: CreateRegistrationDto) {
    return this.authService.create(createAuthDto);
  }
}
