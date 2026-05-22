import { User } from '../db';
export declare class UsersService {
    private users;
    private nextId;
    getAll(): User[];
    getById(id: number): User;
    create(dto: Omit<User, 'id'>): User;
    patch(id: number, dto: Partial<Omit<User, 'id'>>): User;
    put(id: number, dto: Omit<User, 'id'>): User;
    removeById(id: number): {
        message: string;
    };
}
