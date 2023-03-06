import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import { CreateBlogDto, UpdateBlogDto } from './dto';
import { Blog } from './entities/blog.entity';
import { seeds } from './data/seeds';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly filesService: FilesService,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    const blog = new Blog();

    const images = await this.filesService.findByIds(createBlogDto.images);

    blog.title = createBlogDto.title;
    blog.desc = createBlogDto.desc;
    blog.text = createBlogDto.text;
    blog.images = images;
    blog.date = createBlogDto.date;

    return await this.blogRepository.save(blog);
  }

  async findAll() {
    return await this.blogRepository.find({
      relations: {
        images: true,
      },
    });
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: {
        images: true,
      },
    });

    const prev = await this.blogRepository
      .createQueryBuilder()
      .where('id < :id', { id })
      .getOne();

    const next = await this.blogRepository
      .createQueryBuilder()
      .where('id > :id', { id })
      .getOne();

    return { ...blog, prev, next };
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const toUpdate = await this.blogRepository.findOneBy({ id });
    const images = await this.filesService.findByIds(updateBlogDto.images);
    const updated = Object.assign(toUpdate, { ...updateBlogDto, images });
    return await this.blogRepository.save(updated);
  }

  async remove(id: number) {
    return await this.blogRepository.delete(id);
  }

  async removeImage(id: number, imageId: number) {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: {
        images: true,
      },
    });
    blog.images = blog.images.filter((image) => {
      return image.id != imageId;
    });
    return await this.blogRepository.save(blog);
  }

  async seed() {
    for (const seed of seeds) {
      let blog = await this.blogRepository.findOneBy({ title: seed.title });
      if (blog) continue;
      blog = new Blog();

      const image = await this.filesService.findOneBy({ name: seed.imageName });

      blog.title = seed.title;
      blog.desc = seed.desc;
      blog.text = seed.text;
      blog.images = [image];
      blog.date = new Date();

      await this.blogRepository.save(blog);
    }
  }
}
