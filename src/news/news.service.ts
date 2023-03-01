import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import { CreateNewsDto, UpdateNewsDto } from './dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    private readonly filesService: FilesService,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    const news = new News();

    const images = await this.filesService.findByIds(createNewsDto.images);

    news.title = createNewsDto.title;
    news.desc = createNewsDto.desc;
    news.text = createNewsDto.text;
    news.images = images;
    news.date = createNewsDto.date;

    return await this.newsRepository.save(news);
  }

  async findAll() {
    return await this.newsRepository.find({
      relations: {
        images: true,
      },
    });
  }

  async findOne(id: number) {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: {
        images: true,
      },
    });

    const prev = await this.newsRepository
      .createQueryBuilder()
      .where('id < :id', { id })
      .getOne();

    const next = await this.newsRepository
      .createQueryBuilder()
      .where('id > :id', { id })
      .getOne();

    return { ...news, prev, next };
  }

  async setHot(id: number) {
    //TODO сделать 1 запросом
    await this.newsRepository
      .createQueryBuilder()
      .update()
      .set({ is_hot: false })
      .execute();
    return await this.newsRepository
      .createQueryBuilder()
      .update()
      .set({ is_hot: true })
      .where('id = :id', { id })
      .execute();
    // const sql = await this.newsRepository.update(
    //   null,
    //   { is_hot: false },
    // );
    //console.log(sql, id);
    //return sql;

    // return await this.newsRepository.find({
    //   relations: {
    //     images: true,
    //   },
    // });
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const toUpdate = await this.newsRepository.findOneBy({ id });
    const images = await this.filesService.findByIds(updateNewsDto.images);
    const updated = Object.assign(toUpdate, { ...updateNewsDto, images });
    return await this.newsRepository.save(updated);
  }

  async remove(id: number) {
    return await this.newsRepository.delete(id);
  }

  async removeImage(id: number, imageId: number) {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: {
        images: true,
      },
    });
    news.images = news.images.filter((image) => {
      return image.id != imageId;
    });
    return await this.newsRepository.save(news);
  }
}
