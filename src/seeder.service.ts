import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { FilesService } from './files/files.service';
import { NewsService } from './news/news.service';
import { BlogsService } from './blogs/blogs.service';
import { ProjectsService } from './projects/projects.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly usersService: UsersService,
    private readonly filesService: FilesService,
    private readonly newsService: NewsService,
    private readonly blogsService: BlogsService,
    private readonly projectsService: ProjectsService,
  ) {}

  async seed() {
    await this.usersService.seed();
    await this.filesService.seed();
    await this.newsService.seed();
    await this.blogsService.seed();
    await this.projectsService.seed();
  }
}
