import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { FilesModule } from '../files/files.module';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  imports: [TypeOrmModule.forFeature([News]), FilesModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
