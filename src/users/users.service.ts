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

  getUserByName(name: string): User {
    const user = this.data.find(
      (item: User) => item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (!user) throw new NotFoundException(`"${name}" ismli foydalanuvchi topilmadi`);
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

  update(name: string, user: Partial<Omit<User, 'id'>>): User {
    const index = this.data.findIndex(
      (item: User) => item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (index === -1) throw new NotFoundException(`"${name}" ismli foydalanuvchi topilmadi`);

    if (user.email) {
      const isEmailExist = this.data.find(
        (item: User) =>
          item.email === user.email &&
          item.name.toLowerCase() !== name.toLowerCase(),
      );
      if (isEmailExist) throw new ConflictException('Bu email allaqachon mavjud');
    }

    this.data[index] = { ...this.data[index], ...user };
    return this.data[index];
  }

  put(name: string, user: Omit<User, 'id'>): User {
    const index = this.data.findIndex(
      (item: User) => item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (index === -1) throw new NotFoundException(`"${name}" ismli foydalanuvchi topilmadi`);

    this.data[index] = { id: this.data[index].id, ...user };
    return this.data[index];
  }

  delete(name: string): { message: string } {
    const index = this.data.findIndex(
      (item: User) => item.name.trim().toLowerCase() === name.trim().toLowerCase(),
    );
    if (index === -1) throw new NotFoundException(`"${name}" ismli foydalanuvchi topilmadi`);

    this.data.splice(index, 1);
    return { message: `"${name}" ismli foydalanuvchi o'chirildi` };
  }

  linkAuthor(userName: string, authorName: string): { user: User; author: Author } {
    const userIndex = this.data.findIndex(
      (item: User) => item.name.trim().toLowerCase() === userName.trim().toLowerCase(),
    );
    if (userIndex === -1) throw new NotFoundException(`"${userName}" ismli foydalanuvchi topilmadi`);

    const authorIndex = this.authorsData.findIndex(
      (item: Author) => item.name.trim().toLowerCase() === authorName.trim().toLowerCase(),
    );
    if (authorIndex === -1) throw new NotFoundException(`"${authorName}" ismli muallif topilmadi`);

    this.data[userIndex].isAuthor = true;
    this.data[userIndex].authorId = this.authorsData[authorIndex].id;
    this.authorsData[authorIndex].userId = this.data[userIndex].id;

    return {
      user: this.data[userIndex],
      author: this.authorsData[authorIndex],
    };
  }

  getAuthorProfile(userName: string): Author {
    const user = this.data.find(
      (item: User) => item.name.trim().toLowerCase() === userName.trim().toLowerCase(),
    );
    if (!user) throw new NotFoundException(`"${userName}" ismli foydalanuvchi topilmadi`);
    if (!user.authorId) throw new NotFoundException(`"${userName}" foydalanuvchisi hali muallif emas`);

    const author = this.authorsData.find((item: Author) => item.id === user.authorId);
    if (!author) throw new NotFoundException(`Muallif profili topilmadi`);
    return author;
  }
}
