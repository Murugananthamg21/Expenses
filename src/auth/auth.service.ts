import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAuthDto, CreateRegistrationDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import * as bcrypt from 'bcryptjs';
import { UserRoles } from './dto/create-auth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userrepo: EntityRepository<User>,
    private readonly jwtService: JwtService,
    private readonly em: EntityManager,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userrepo.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: User) {
    const payload = { username: user.userName, sub: user.id, role: user.role };
    const secretKey = this.configService.get<string>('JWT_SECRET');
    if (!secretKey) {
      throw new Error('JWT_SECRET is not defined');
    }
    return {
      access_token: this.jwtService.sign(payload, {
        secret: secretKey,
        expiresIn: '1h',
      }),
      ...payload,
    };
  }

  async create(createAuthDto: CreateRegistrationDto) {
    try {
      const { email, password, mobile } = createAuthDto;

      const existingUser = await this.userrepo.findOne({ email, mobile });
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = this.userrepo.create({
        ...createAuthDto,
        password: hashedPassword,
        role: UserRoles.USER,
      });
      await this.em.persistAndFlush(newUser);
      return { message: 'User registered successfully', userId: newUser.id };
    } catch (e) {
      if (e instanceof BadRequestException) throw e;
      throw new InternalServerErrorException(e.message);
    }
  }
}
