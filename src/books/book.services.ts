import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, books } from '../db';

@Injectable()
export class BooksService {
  private books: Book[] = books;
  private nextId = books.length + 1;

  getAll(): Book[] {
    return this.books;
  }

  getById(id: number): Book {
    const book = this.books.find(b => b.id === id);
    if (!book) throw new NotFoundException(`ID ${id} li kitob topilmadi`);
    return book;
  }

  post(dto: Omit<Book, 'id'>): Book {
    const book: Book = { id: this.nextId++, ...dto };
    this.books.push(book);
    return book;
  }

  patch(id: number, dto: Partial<Omit<Book, 'id'>>): Book {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) throw new NotFoundException(`ID ${id} li kitob topilmadi`);
    this.books[index] = { ...this.books[index], ...dto };
    return this.books[index];
  }

  putById(id: number, dto: Omit<Book, 'id'>): Book {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) throw new NotFoundException(`ID ${id} li kitob topilmadi`);
    this.books[index] = { id, ...dto };
    return this.books[index];
  }

  remove(id: number): { message: string } {
    const index = this.books.findIndex(b => b.id === id);
    if (index === -1) throw new NotFoundException(`ID ${id} li kitob topilmadi`);
    this.books.splice(index, 1);
    return { message: `ID ${id} li kitob o'chirildi` };
  }
}
