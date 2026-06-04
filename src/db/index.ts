export interface Author {
  id: number;
  name: string;
  bookName: string;
  email: string;
  birthday: string;
  user: boolean;
}

export interface Book {
  id: number;
  name: string;
  author: string;
  desc: string;
  year: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  author: boolean;
}

export const authors: Author[] = [
  {
    id: 1,
    name: 'Malika Yusupova',
    bookName: 'NestJS Asoslari',
    email: 'malika@example.com',
    birthday: '1990-05-15',
    user: false,
  },
];

export const users: User[] = [
  {
    id: 1,
    username: 'Ali Karimov',
    email: 'ali@example.com',
    password: 'secret123',
    author: false,
  },
];

export const books: Book[] = [
  {
    id: 1,
    name: 'NestJS Asoslari',
    author: 'Malika Yusupova',
    desc: 'NestJS haqida qollanma',
    year: 2024,
  },
];
