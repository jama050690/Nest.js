import { Injectable, NotFoundException } from '@nestjs/common';
import { User, users } from '../db';


@Injectable()
export class UsersService {
  private users: User[] = users;
  private nextId = users.length + 1;

  getAll(): User[] {
    return this.users;
  }

  getById(id: number): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException(`ID ${id} li foydalanuvchi topilmadi`);
    return user;
  }

  create(dto: Omit<User, 'id'>): User { 
    const user: User = { id: this.nextId++, ...dto };
    this.users.push(user);
    return user;
  }

  patch(id: number, dto: Partial<Omit<User, 'id'>>): User {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`ID ${id} li foydalanuvchi topilmadi`);
    this.users[index] = { ...this.users[index], ...dto };
    return this.users[index];
  }

  put(id: number, dto: Omit<User, 'id'>): User {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`ID ${id} li foydalanuvchi topilmadi`);
    this.users[index] = { id, ...dto };
    return this.users[index];
  }

  removeById(id: number): { message: string } {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new NotFoundException(`ID ${id} li foydalanuvchi topilmadi`);
    this.users.splice(index, 1);
    return { message: `ID ${id} li foydalanuvchi o'chirildi` };
  }
}