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
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  getAuthors(): Author[] {
    return this.authorsService.getAuthors();
  }

  @Get(':name')
  getAuthorByName(@Param('name') name: string): Author {
    return this.authorsService.getAuthorByName(name);
  }

  @Get(':name/user')
  getUserProfile(@Param('name') name: string): User {
    return this.authorsService.getUserProfile(name);
  }

  @Post()
  createAuthor(@Body() data: Omit<Author, 'id'>): Author {
    return this.authorsService.create(data);
  }

  @Patch(':name')
  updateAuthor(
    @Param('name') name: string,
    @Body() data: Partial<Omit<Author, 'id'>>,
  ): Author {
    return this.authorsService.update(name, data);
  }

  @Put(':name')
  putAuthor(
    @Param('name') name: string,
    @Body() data: Omit<Author, 'id'>,
  ): Author {
    return this.authorsService.put(name, data);
  }

  @Delete(':name')
  removeAuthor(@Param('name') name: string): { message: string } {
    return this.authorsService.delete(name);
  }
}
