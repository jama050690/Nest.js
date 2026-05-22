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
import { Book } from '../../db';
import { BooksService } from './book.services';

@Controller('books')
export class BookController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAll(): Book[] {
    return this.booksService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Book {
    return this.booksService.getById(id);
  }

  @Post()
  create(@Body() dto: Omit<Book, 'id'>): Book {
    return this.booksService.post(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<Omit<Book, 'id'>>): Book {
    return this.booksService.patch(id, dto);
  }

  @Put(':id')
  put(@Param('id', ParseIntPipe) id: number, @Body() dto: Omit<Book, 'id'>): Book {
    return this.booksService.putById(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.booksService.remove(id);
  }
}
