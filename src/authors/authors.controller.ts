import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { Author } from '../db';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  getAuthors(): Author[] {
    return this.authorsService.getAuthors();
  }

  @Get(':id')
  getAuthorById(@Param('id') id: string): Author {
    return this.authorsService.getAuthorById(id);
  }

  @Post()
  createAuthor(@Body() data: Omit<Author, 'id'>): Author {
    return this.authorsService.create(data);
  }

  @Patch(':id')
  updateAuthor(
    @Param('id') id: string,
    @Body() data: Partial<Omit<Author, 'id'>>,
  ): Author {
    return this.authorsService.update(id, data);
  }

  @Delete(':id')
  removeAuthor(@Param('id') id: string): { message: string } {
    return this.authorsService.delete(id);
  }
}
