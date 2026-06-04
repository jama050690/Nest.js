import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { User } from '../db';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): User[] {
    return this.userService.getUsers();
  }

  @Get(':name')
  getUserByName(@Param('name') name: string): User {
    return this.userService.getUserByName(name);
  }

  @Post()
  createUser(@Body() data: Omit<User, 'id'>): User {
    return this.userService.create(data);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() data: Partial<Omit<User, 'id'>>,
  ): User {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string): { message: string } {
    return this.userService.delete(id);
  }
}
