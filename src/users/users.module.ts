import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BooksService } from './books/book.services';
import { BookController } from './books/book.controller';

@Module({
  controllers: [UsersController, BookController],
  providers: [UsersService, BooksService],
  
})
export class UsersModule {}
