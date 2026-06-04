import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Author, authors, User, users } from '../db';

@Injectable()
export class UserService {
  private data: User[] = users;
  private authorsData: Author[] = authors;

  getUsers(): User[] {
    return this.data;
  }

  getUserByName(username: string): User {
    const user = this.data.find(
      (item: User) => item.username.trim().toLowerCase() === username.trim().toLowerCase(),
    );
    if (!user) throw new NotFoundException(`"${username}" ismli foydalanuvchi topilmadi`);
    return user;
  }

  create(user: Omit<User, 'id'>): User {
    const existing = this.data.find((item: User) => item.email === user.email);
    if (existing) throw new ConflictException('Bu email allaqachon mavjud');

    const id: number = Math.round(Math.random() * 1000);
    const newUser: User = { id, ...user };
    this.data.push(newUser);
    return newUser;
  }

  update(username: string, user: Partial<Omit<User, 'id'>>): User {
    const index = this.data.findIndex(
      (item: User) => item.username.trim().toLowerCase() === username.trim().toLowerCase(),
    );
    if (index === -1) throw new NotFoundException(`"${username}" ismli foydalanuvchi topilmadi`);

    if (user.email) {
      const isEmailExist = this.data.find(
        (item: User) =>
          item.email === user.email &&
          item.username.toLowerCase() !== username.toLowerCase(),
      );
      if (isEmailExist) throw new ConflictException('Bu email allaqachon mavjud');
    }

    this.data[index] = { ...this.data[index], ...user };
    return this.data[index];
  }

  put(username: string, user: Omit<User, 'id'>): User {
    const index = this.data.findIndex(
      (item: User) => item.username.trim().toLowerCase() === username.trim().toLowerCase(),
    );
    if (index === -1) throw new NotFoundException(`"${username}" ismli foydalanuvchi topilmadi`);

    this.data[index] = { id: this.data[index].id, ...user };
    return this.data[index];
  }

  delete(username: string): { message: string } {
    const index = this.data.findIndex(
      (item: User) => item.username.trim().toLowerCase() === username.trim().toLowerCase(),
    );
    if (index === -1) throw new NotFoundException(`"${username}" ismli foydalanuvchi topilmadi`);

    this.data.splice(index, 1);
    return { message: `"${username}" ismli foydalanuvchi o'chirildi` };
  }

  linkAuthor(username: string, authorName: string): { user: User; author: Author } {
    const userIndex = this.data.findIndex(
      (item: User) => item.username.trim().toLowerCase() === username.trim().toLowerCase(),
    );
    if (userIndex === -1) throw new NotFoundException(`"${username}" ismli foydalanuvchi topilmadi`);

    const authorIndex = this.authorsData.findIndex(
      (item: Author) => item.name.trim().toLowerCase() === authorName.trim().toLowerCase(),
    );
    if (authorIndex === -1) throw new NotFoundException(`"${authorName}" ismli muallif topilmadi`);

    this.data[userIndex].author = true;
    this.authorsData[authorIndex].user = true;

    return {
      user: this.data[userIndex],
      author: this.authorsData[authorIndex],
    };
  }

  getAuthorProfile(username: string): Author {
    const user = this.data.find(
      (item: User) => item.username.trim().toLowerCase() === username.trim().toLowerCase(),
    );
    if (!user) throw new NotFoundException(`"${username}" ismli foydalanuvchi topilmadi`);
    if (!user.author) throw new NotFoundException(`"${username}" foydalanuvchisi hali muallif emas`);

    const author = this.authorsData.find(
      (item: Author) => item.name.trim().toLowerCase() === username.trim().toLowerCase(),
    );
    if (!author) throw new NotFoundException(`Muallif profili topilmadi`);
    return author;
  }
}
