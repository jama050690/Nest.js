import {
  BadRequestException,
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

  getBookByName(name: string): Book {
    const book = this.data.find(
      (item: Book) => item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (!book) throw new NotFoundException(`"${name}" nomli kitob topilmadi`);
    return book;
  }

  create(book: Omit<Book, 'id'>): Book {
    if (!book || !book.name) throw new BadRequestException('name maydoni majburiy');

    const existing = this.data.find((item: Book) => item.name === book.name);
    if (existing) throw new ConflictException('Bu nomdagi kitob allaqachon mavjud');

    const id: number = Math.round(Math.random() * 1000);
    const newBook: Book = { id, ...book };
    this.data.push(newBook);
    return newBook;
  }

  update(name: string, book: Partial<Omit<Book, 'id'>>): Book {
    const index = this.data.findIndex(
      (item: Book) => item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (index === -1) throw new NotFoundException(`"${name}" nomli kitob topilmadi`);

    this.data[index] = { ...this.data[index], ...book };
    return this.data[index];
  }

  put(name: string, book: Omit<Book, 'id'>): Book {
    const index = this.data.findIndex(
      (item: Book) => item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (index === -1) throw new NotFoundException(`"${name}" nomli kitob topilmadi`);

    this.data[index] = { id: this.data[index].id, ...book };
    return this.data[index];
  }

  delete(name: string): { message: string } {
    const index = this.data.findIndex(
      (item: Book) => item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (index === -1) throw new NotFoundException(`"${name}" nomli kitob topilmadi`);

    this.data.splice(index, 1);
    return { message: `"${name}" nomli kitob o'chirildi` };
  }
}
