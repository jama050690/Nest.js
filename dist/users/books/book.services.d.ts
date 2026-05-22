import { Book } from '../../db';
export declare class BooksService {
    private books;
    private nextId;
    getAll(): Book[];
    getById(id: number): Book;
    post(dto: Omit<Book, 'id'>): Book;
    patch(id: number, dto: Partial<Omit<Book, 'id'>>): Book;
    putById(id: number, dto: Omit<Book, 'id'>): Book;
    remove(id: number): {
        message: string;
    };
}
