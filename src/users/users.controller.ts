import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IUser } from '../types';
import { UserService } from './users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUser(): IUser[] {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() data: Omit<IUser, 'id'>) {
    return this.userService.create(data);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() data: Partial<Omit<IUser, 'id'>>,
  ) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
