import { UsersService } from './users.service';
import type { User } from '../db';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(): User[];
    getById(id: number): User;
    create(dto: Omit<User, 'id'>): User;
    patch(id: number, dto: Partial<Omit<User, 'id'>>): User;
    put(id: number, dto: Omit<User, 'id'>): User;
    remove(id: number): {
        message: string;
    };
}
