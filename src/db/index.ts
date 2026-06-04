export interface Author {
  id: number;
  name: string;
  bio: string;
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
  name: string;
  email: string;
  password: string;
  isAuthor: boolean;
  books?: Book[];
}

export const authors: Author[] = [
  {
    id: 1,
    name: 'Malika Yusupova',
    bio: "NestJS va backend dasturlash bo'yicha mutaxassis",
  },
];

export const users: User[] = [
  {
    id: 1,
    name: 'Ali Karimov',
    email: 'ali@example.com',
    password: 'secret123',
    isAuthor: false,
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
