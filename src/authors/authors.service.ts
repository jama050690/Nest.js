import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Author, authors, User, users } from '../db';

@Injectable()
export class AuthorsService {
  private data: Author[] = authors;
  private usersData: User[] = users;

  getAuthors(): Author[] {
    return this.data;
  }

  getAuthorByName(name: string): Author {
    const author = this.data.find(
      (item: Author) => item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (!author) throw new NotFoundException(`"${name}" ismli muallif topilmadi`);
    return author;
  }

  create(author: Omit<Author, 'id'>): Author {
    const existing = this.data.find(
      (item: Author) => item.name.trim().toLowerCase() === author.name.trim().toLowerCase(),
    );
    if (existing) throw new ConflictException('Bu nomdagi muallif allaqachon mavjud');

    const id: number = Math.round(Math.random() * 1000);
    const newAuthor: Author = { id, ...author };
    this.data.push(newAuthor);
    return newAuthor;
  }

  update(name: string, author: Partial<Omit<Author, 'id'>>): Author {
    const index = this.data.findIndex(
      (item: Author) => item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (index === -1) throw new NotFoundException(`"${name}" ismli muallif topilmadi`);

    this.data[index] = { ...this.data[index], ...author };
    return this.data[index];
  }

  put(name: string, author: Omit<Author, 'id'>): Author {
    const index = this.data.findIndex(
      (item: Author) => item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (index === -1) throw new NotFoundException(`"${name}" ismli muallif topilmadi`);

    this.data[index] = { id: this.data[index].id, ...author };
    return this.data[index];
  }

  delete(name: string): { message: string } {
    const index = this.data.findIndex(
      (item: Author) => item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (index === -1) throw new NotFoundException(`"${name}" ismli muallif topilmadi`);

    this.data.splice(index, 1);
    return { message: `"${name}" ismli muallif o'chirildi` };
  }

  getUserProfile(authorName: string): User {
    const author = this.data.find(
      (item: Author) => item.name.trim().toLowerCase() === authorName.trim().toLowerCase(),
    );
    if (!author) throw new NotFoundException(`"${authorName}" ismli muallif topilmadi`);
    if (!author.user) throw new NotFoundException(`"${authorName}" muallifining foydalanuvchi profili yo'q`);

    const user = this.usersData.find(
      (item: User) => item.username.trim().toLowerCase() === authorName.trim().toLowerCase(),
    );
    if (!user) throw new NotFoundException(`Foydalanuvchi profili topilmadi`);
    return user;
  }
}
