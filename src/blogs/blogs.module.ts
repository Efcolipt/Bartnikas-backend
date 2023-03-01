import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { FilesModule } from '../files/files.module';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), FilesModule],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
