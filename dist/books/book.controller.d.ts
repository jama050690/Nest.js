import type { Book } from '../db';
import { BooksService } from './book.services';
export declare class BookController {
    private readonly booksService;
    constructor(booksService: BooksService);
    getAll(): Book[];
    getById(id: number): Book;
    create(dto: Omit<Book, 'id'>): Book;
    update(id: number, dto: Partial<Omit<Book, 'id'>>): Book;
    put(id: number, dto: Omit<Book, 'id'>): Book;
    remove(id: number): {
        message: string;
    };
}
