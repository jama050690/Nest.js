import { IUser } from '../types';
export declare class UserService {
    data: IUser[];
    getUsers(): IUser[];
    getUserById(id: string): IUser | undefined;
    create(user: Omit<IUser, 'id'>): IUser;
    update(id: string, user: Partial<Omit<IUser, 'id'>>): IUser;
    delete(id: string): string;
}
