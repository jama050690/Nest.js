import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Author, authors } from '../db';

@Injectable()
export class AuthorsService {
  private data: Author[] = authors;

  getAuthors(): Author[] {
    return this.data;
  }

  getAuthorByName(name: string): Author {
    const author = this.data.find(
      (item: Author) => item.name.toLowerCase() === name.toLowerCase(),
    );
    if (!author) {
      throw new NotFoundException(`"${name}" ismli muallif topilmadi`);
    }
    return author;
  }

  create(author: Omit<Author, 'id'>): Author {
    const existing = this.data.find((item: Author) => item.name === author.name);
    if (existing) {
      throw new ConflictException('Bu nomdagi muallif allaqachon mavjud');
    }

    const id: number = Math.round(Math.random() * 1000);
    const newAuthor: Author = { id, ...author };
    this.data.push(newAuthor);
    return newAuthor;
  }

  update(id: string, author: Partial<Omit<Author, 'id'>>): Author {
    const index = this.data.findIndex((item: Author) => item.id === Number(id));
    if (index === -1) {
      throw new NotFoundException(`ID ${id} li muallif topilmadi`);
    }

    this.data[index] = { ...this.data[index], ...author };
    return this.data[index];
  }

  delete(id: string): { message: string } {
    const index = this.data.findIndex((item: Author) => item.id === Number(id));
    if (index === -1) {
      throw new NotFoundException(`ID ${id} li muallif topilmadi`);
    }

    this.data.splice(index, 1);
    return { message: `ID ${id} li muallif o'chirildi` };
  }
}
