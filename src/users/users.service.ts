import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User, users } from '../db';

@Injectable()
export class UserService {
  private data: User[] = users;

  getUsers(): User[] {
    return this.data;
  }

  getUserByName(name: string): User {
    const user = this.data.find(
      (item: User) => item.name.toLowerCase() === name.toLowerCase(),
    );
    if (!user) {
      throw new NotFoundException(`"${name}" ismli foydalanuvchi topilmadi`);
    }
    return user;
  }

  create(user: Omit<User, 'id'>): User {
    const existing = this.data.find((item: User) => item.email === user.email);
    if (existing) {
      throw new ConflictException('Bu email allaqachon mavjud');
    }

    const id: number = Math.round(Math.random() * 1000);
    const newUser: User = { id, ...user };
    this.data.push(newUser);
    return newUser;
  }

  update(id: string, user: Partial<Omit<User, 'id'>>): User {
    const index = this.data.findIndex((item: User) => item.id === Number(id));
    if (index === -1) {
      throw new NotFoundException(`ID ${id} li foydalanuvchi topilmadi`);
    }

    if (user.email) {
      const isEmailExist = this.data.find(
        (item: User) => item.email === user.email && item.id !== Number(id),
      );
      if (isEmailExist) {
        throw new ConflictException('Bu email allaqachon mavjud');
      }
    }

    this.data[index] = { ...this.data[index], ...user };
    return this.data[index];
  }

  delete(id: string): { message: string } {
    const index = this.data.findIndex((item: User) => item.id === Number(id));
    if (index === -1) {
      throw new NotFoundException(`ID ${id} li foydalanuvchi topilmadi`);
    }

    this.data.splice(index, 1);
    return { message: `ID ${id} li foydalanuvchi o'chirildi` };
  }
}
