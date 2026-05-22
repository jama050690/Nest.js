"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const db_1 = require("../../db");
let BooksService = class BooksService {
    books = db_1.books;
    nextId = db_1.books.length + 1;
    getAll() {
        return this.books;
    }
    getById(id) {
        const book = this.books.find(b => b.id === id);
        if (!book)
            throw new common_1.NotFoundException(`ID ${id} li kitob topilmadi`);
        return book;
    }
    post(dto) {
        const book = { id: this.nextId++, ...dto };
        this.books.push(book);
        return book;
    }
    patch(id, dto) {
        const index = this.books.findIndex(b => b.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`ID ${id} li kitob topilmadi`);
        this.books[index] = { ...this.books[index], ...dto };
        return this.books[index];
    }
    putById(id, dto) {
        const index = this.books.findIndex(b => b.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`ID ${id} li kitob topilmadi`);
        this.books[index] = { id, ...dto };
        return this.books[index];
    }
    remove(id) {
        const index = this.books.findIndex(b => b.id === id);
        if (index === -1)
            throw new common_1.NotFoundException(`ID ${id} li kitob topilmadi`);
        this.books.splice(index, 1);
        return { message: `ID ${id} li kitob o'chirildi` };
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)()
], BooksService);
//# sourceMappingURL=book.services.js.map