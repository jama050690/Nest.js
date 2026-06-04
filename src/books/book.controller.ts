import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import type { Book } from '../db';
import { BooksService } from './book.services';

@Controller('books')
export class BookController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  getBooks(): Book[] {
    return this.booksService.getBooks();
  }

  @Get(':name')
  getBookByName(@Param('name') name: string): Book {
    return this.booksService.getBookByName(name);
  }

  @Post()
  createBook(@Body() data: Omit<Book, 'id'>): Book {
    return this.booksService.create(data);
  }

  @Patch(':id')
  updateBook(
    @Param('id') id: string,
    @Body() data: Partial<Omit<Book, 'id'>>,
  ): Book {
    return this.booksService.update(id, data);
  }

  @Delete(':id')
  removeBook(@Param('id') id: string): { message: string } {
    return this.booksService.delete(id);
  }
}
