import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Book, books } from '../db';

@Injectable()
export class BooksService {
  private data: Book[] = books;

  getBooks(): Book[] {
    return this.data;
  }

  getBookById(id: string): Book {
    const book = this.data.find((item: Book) => item.id === Number(id));
    if (!book) {
      throw new NotFoundException(`ID ${id} li kitob topilmadi`);
    }
    return book;
  }

  create(book: Omit<Book, 'id'>): Book {
    const existing = this.data.find((item: Book) => item.name === book.name);
    if (existing) {
      throw new ConflictException('Bu nomdagi kitob allaqachon mavjud');
    }

    const id: number = Math.round(Math.random() * 1000);
    const newBook: Book = { id, ...book };
    this.data.push(newBook);
    return newBook;
  }

  update(id: string, book: Partial<Omit<Book, 'id'>>): Book {
    const index = this.data.findIndex((item: Book) => item.id === Number(id));
    if (index === -1) {
      throw new NotFoundException(`ID ${id} li kitob topilmadi`);
    }

    this.data[index] = { ...this.data[index], ...book };
    return this.data[index];
  }

  delete(id: string): { message: string } {
    const index = this.data.findIndex((item: Book) => item.id === Number(id));
    if (index === -1) {
      throw new NotFoundException(`ID ${id} li kitob topilmadi`);
    }

    this.data.splice(index, 1);
    return { message: `ID ${id} li kitob o'chirildi` };
  }
}
