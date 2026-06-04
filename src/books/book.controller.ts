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
import type { Book } from '../db';
import { BooksService } from './book.services';

@Controller('books')
export class BookController {
  constructor(private readonly booksService: BooksService) {}

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

  @Patch(':name')
  updateBook(
    @Param('name') name: string,
    @Body() data: Partial<Omit<Book, 'id'>>,
  ): Book {
    return this.booksService.update(name, data);
  }

  @Put(':name')
  putBook(
    @Param('name') name: string,
    @Body() data: Omit<Book, 'id'>,
  ): Book {
    return this.booksService.put(name, data);
  }

  @Delete(':name')
  removeBook(@Param('name') name: string): { message: string } {
    return this.booksService.delete(name);
  }
}
