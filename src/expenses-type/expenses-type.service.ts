import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateExpensesTypeDto } from './dto/create-expenses-type.dto';
import { UpdateExpensesTypeDto } from './dto/update-expenses-type.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ExpensesType } from './entities/expenses-type.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class ExpensesTypeService {
  constructor(
    @InjectRepository(ExpensesType)
    private readonly expensesRepo: EntityRepository<ExpensesType>,
    private readonly em: EntityManager,
  ) {}
  async create(
    createExpensesTypeDto: CreateExpensesTypeDto,
  ): Promise<ExpensesType> {
    try {
      const { expensesType } = createExpensesTypeDto;
      const existingExpenseType = await this.expensesRepo.findOne({
        expensesType,
      });
      if (existingExpenseType) {
        throw new BadRequestException(`Expense type already exists`);
      }
      const newExpensesType = this.expensesRepo.create({ expensesType });
      await this.em.persistAndFlush(newExpensesType);
      return newExpensesType;
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException(`${e.message}`);
    }
  }

  async findAll(
    page: number,
    limit: number,
    sort: string,
    filter: string,
    search: string,
  ) {
    try {
      const queryBuilder = this.expensesRepo.createQueryBuilder('e');
      if (search) {
        queryBuilder.andWhere({ 'e.expensesType ILIKE ': `%${search}%` });
      }
      if (filter) {
        queryBuilder.andWhere({ 'e.expensesType': filter });
      }
      if (sort) {
        const [field, order] = sort.split(':');
        queryBuilder.orderBy({ [field]: order.toUpperCase() });
      }

      queryBuilder.offset((page - 1) * limit).limit(limit);
      const results = await queryBuilder.getResultList();
      const totalCount = await this.expensesRepo.count();
      return { data: results, totalCount, page, limit };
    } catch (e) {
      // Handle errors gracefully
      throw new InternalServerErrorException(
        `Error fetching expenses types: ${e.message}`,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} expensesType`;
  }

  update(id: number, updateExpensesTypeDto: UpdateExpensesTypeDto) {
    return `This action updates a #${id} expensesType`;
  }

  remove(id: number) {
    return `This action removes a #${id} expensesType`;
  }
}
