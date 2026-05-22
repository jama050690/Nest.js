"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../db");
let UsersService = class UsersService {
    users = db_1.users;
    nextId = db_1.users.length + 1;
    getAll() {
        return this.users;
    }
    getById(id) {
        const user = this.users.find(u => u.id === id);
        if (!user)
            throw new common_1.NotFoundException(`ID ${id} li foydalanuvchi topilmadi`);
        return user;
    }
    create(dto) {
        const user = { id: this.nextId++, ...dto };
        this.users.push(user);
        return user;
    }
    patch(id, dto) {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`ID ${id} li foydalanuvchi topilmadi`);
        this.users[index] = { ...this.users[index], ...dto };
        return this.users[index];
    }
    put(id, dto) {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`ID ${id} li foydalanuvchi topilmadi`);
        this.users[index] = { id, ...dto };
        return this.users[index];
    }
    removeById(id) {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`ID ${id} li foydalanuvchi topilmadi`);
        this.users.splice(index, 1);
        return { message: `ID ${id} li foydalanuvchi o'chirildi` };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map