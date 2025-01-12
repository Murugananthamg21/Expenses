import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateExpenseDto, FindAllDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Expense } from './entities/expense.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenserepo: EntityRepository<Expense>,
    private readonly em: EntityManager,
  ) {}
  async create(createExpenseDto: CreateExpenseDto) {
    try {
      const create = await this.expenserepo.create({ ...createExpenseDto });
      this.em.persistAndFlush(create);
      return { message: 'successfully created', statusCode: 200 };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  async Search(search: string) {
    if (!search) return {};
    const isNumeric = !isNaN(Number(search));
    const filters: any = {
      $or: [
        { expense: { $ilike: `%${search}%` } },
        { payamentMathod: { $ilike: `%${search}%` } },
      ],
    };

    if (isNumeric) {
      filters.$or.push({
        amount: { $eq: Number(search) },
      });
    }

    return filters;
  }

  async findAll({ offset, limit, search }: FindAllDto) {
    try {
      const searchfilter = await this.Search(search);
      const qb = this.expenserepo
        .createQueryBuilder('e')
        .andWhere(searchfilter);
      qb.offset(offset).limit(limit);
      const [data, total] = await qb.getResultAndCount();
      return { data, total, offset, limit };
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
