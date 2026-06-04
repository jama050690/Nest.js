import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import type { Author, User } from '../db';
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

  @Get(':name/author')
  getAuthorProfile(@Param('name') name: string): Author {
    return this.userService.getAuthorProfile(name);
  }

  @Post()
  createUser(@Body() data: Omit<User, 'id'>): User {
    return this.userService.create(data);
  }

  @Patch(':name')
  updateUser(
    @Param('name') name: string,
    @Body() data: Partial<Omit<User, 'id'>>,
  ): User {
    return this.userService.update(name, data);
  }

  @Patch(':name/link-author')
  linkAuthor(
    @Param('name') name: string,
    @Body('authorName') authorName: string,
  ): { user: User; author: Author } {
    return this.userService.linkAuthor(name, authorName);
  }

  @Put(':name')
  putUser(
    @Param('name') name: string,
    @Body() data: Omit<User, 'id'>,
  ): User {
    return this.userService.put(name, data);
  }

  @Delete(':name')
  removeUser(@Param('name') name: string): { message: string } {
    return this.userService.delete(name);
  }
}
