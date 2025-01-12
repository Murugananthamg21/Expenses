import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import config from './mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
import { ExpensesModule } from './expenses/expenses.module';
import { ExpensesTypeModule } from './expenses-type/expenses-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(config),
    UserModule,
    AuthModule,
    ExpensesModule,
    ExpensesTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
