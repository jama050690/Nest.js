import { Module } from '@nestjs/common';
import { BooksService } from './book.services';
import { BookController } from './book.controller';

@Module({
  controllers: [ BookController],
  providers: [ BooksService],
  
})
export class BooksModule {}
