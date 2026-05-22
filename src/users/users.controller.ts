import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../db';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): User[] {
    return this.usersService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): User {
    return this.usersService.getById(id);
  }

  @Post()
  create(@Body() dto: Omit<User, 'id'>): User {
    return this.usersService.create(dto);
  }

  @Patch(':id')
  patch(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<Omit<User, 'id'>>): User {
    return this.usersService.patch(id, dto);
  }

  @Put(':id')
  put(@Param('id', ParseIntPipe) id: number, @Body() dto: Omit<User, 'id'>): User {
    return this.usersService.put(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.usersService.removeById(id);
  }
}
