export interface Book {
    id: number;
    name: string;
    author: string;
    desc: string;
    year: number;
}
export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    isAuthor: boolean;
    books?: Book[];
}
export declare const users: User[];
export declare const books: Book[];
