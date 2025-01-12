import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ExpensesTypeService } from './expenses-type.service';
import { CreateExpensesTypeDto } from './dto/create-expenses-type.dto';
import { UpdateExpensesTypeDto } from './dto/update-expenses-type.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRoles } from 'src/auth/dto/create-auth.dto';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRoles.USER)
@Controller('expenses-type')
export class ExpensesTypeController {
  constructor(private readonly expensesTypeService: ExpensesTypeService) {}

  @Post()
  create(@Body() createExpensesTypeDto: CreateExpensesTypeDto) {
    return this.expensesTypeService.create(createExpensesTypeDto);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Sort order (e.g., "field:asc")',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description: 'Filter by specific field (e.g., "expensesType")',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search query for expense types',
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'expensesType:asc',
    @Query('filter') filter: string = '',
    @Query('search') search: string = '',
  ) {
    return this.expensesTypeService.findAll(page, limit, sort, filter, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpensesTypeDto: UpdateExpensesTypeDto,
  ) {
    return this.expensesTypeService.update(+id, updateExpensesTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesTypeService.remove(+id);
  }
}
