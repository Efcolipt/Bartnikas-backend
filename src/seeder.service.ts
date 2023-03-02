import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { FilesService } from './files/files.service';
import { NewsService } from './news/news.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
    private readonly newsService: NewsService,
  ) {}

  async seed() {
    await this.usersService.seed();
    await this.filesService.seed();
    await this.newsService.seed();
  }
}
