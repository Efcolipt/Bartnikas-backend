import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto, UpdateNewsDto } from './dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    const news = new News();

    news.title = createNewsDto.title;
    news.desc = createNewsDto.desc;
    news.text = createNewsDto.text;
    //news.img = createNewsDto.img;
    news.date = createNewsDto.date;

    return await this.newsRepository.save(news);
  }

  async findAll() {
    return await this.newsRepository.find();
  }

  async findOne(id: number) {
    return await this.newsRepository.findOneBy({ id });
  }

  async findPrev(id: number) {
    return await this.newsRepository
      .createQueryBuilder()
      .where('id < :id', { id })
      .getOne();
  }

  async findNext(id: number) {
    return await this.newsRepository
      .createQueryBuilder()
      .where('id > :id', { id })
      .getOne();
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const toUpdate = await this.newsRepository.findOneBy({ id });
    const updated = Object.assign(toUpdate, updateNewsDto);
    return await this.newsRepository.save(updated);
  }

  async remove(id: number) {
    return await this.newsRepository.delete(id);
  }
}
