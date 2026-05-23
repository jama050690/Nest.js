import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../types';

@Injectable()
export class UserService {
  // { users: [], books: [] };
  data: IUser[] = [];

  getUsers(): IUser[] {
    return this.data;
  }

  getUserById(id: string): IUser | undefined {
    const data = this.data.find((item: IUser) => item.id === Number(id));
    if (!data) {
      throw new NotFoundException();
    }
    return data;
  }

  create(user: Omit<IUser, 'id'>): IUser {
    const data = this.data.find((item: IUser) => item.email === user.email);
    if (data) {
      throw new ConflictException();
    }

    const id: number = Math.round(Math.random() * 1000);
    const newUser: IUser = { id, ...user };
    this.data.push(newUser);
    return newUser;
  }

  update(id: string, user: Partial<Omit<IUser, 'id'>>): IUser {
    const data = this.data.find((item: IUser) => item.id === Number(id));
    if (!data) {
      throw new NotFoundException();
    }

    const isEmailExist = this.data.find(
      (item: IUser) => item.email === user.email,
    );
    if (isEmailExist) {
      throw new ConflictException();
    }

    const updatedUser: IUser = { ...data, ...user };

    this.data = this.data.map((item: IUser) => {
      return item.id === Number(id) ? updatedUser : item;
    });

    return updatedUser;
  }

  delete(id: string) {
    const data = this.data.find((item: IUser) => item.id === Number(id));
    if (!data) {
      throw new NotFoundException();
    }

    this.data = this.data.filter((item: IUser) => {
      return item.id !== Number(id);
    });

    console.log(this.data);
    return 'Successfully deleted';
  }
}
