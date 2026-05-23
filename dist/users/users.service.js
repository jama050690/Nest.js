"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    data = [];
    getUsers() {
        return this.data;
    }
    getUserById(id) {
        const data = this.data.find((item) => item.id === Number(id));
        if (!data) {
            throw new common_1.NotFoundException();
        }
        return data;
    }
    create(user) {
        const data = this.data.find((item) => item.email === user.email);
        if (data) {
            throw new common_1.ConflictException();
        }
        const id = Math.round(Math.random() * 1000);
        const newUser = { id, ...user };
        this.data.push(newUser);
        return newUser;
    }
    replace(id, user) {
        const index = this.data.findIndex((item) => item.id === Number(id));
        if (index === -1) {
            throw new common_1.NotFoundException();
        }
        const replaced = { id: Number(id), ...user };
        this.data[index] = replaced;
        return replaced;
    }
    update(id, user) {
        const data = this.data.find((item) => item.id === Number(id));
        if (!data) {
            throw new common_1.NotFoundException();
        }
        const isEmailExist = this.data.find((item) => item.email === user.email);
        if (isEmailExist) {
            throw new common_1.ConflictException();
        }
        const updatedUser = { ...data, ...user };
        this.data = this.data.map((item) => {
            return item.id === Number(id) ? updatedUser : item;
        });
        return updatedUser;
    }
    delete(id) {
        const data = this.data.find((item) => item.id === Number(id));
        if (!data) {
            throw new common_1.NotFoundException();
        }
        this.data = this.data.filter((item) => {
            return item.id !== Number(id);
        });
        console.log(this.data);
        return 'Successfully deleted';
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=users.service.js.map