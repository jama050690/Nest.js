import { IUser } from '../types';
import { UserService } from './users.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUser(): IUser[];
    getUserById(id: string): IUser | undefined;
    createUser(data: Omit<IUser, 'id'>): IUser;
    replaceUser(id: string, data: Omit<IUser, 'id'>): IUser;
    updateUser(id: string, data: Partial<Omit<IUser, 'id'>>): IUser;
    removeUser(id: string): string;
}
