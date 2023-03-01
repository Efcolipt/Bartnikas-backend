import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.newsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/set-hot')
  setHot(@Param('id') id: number) {
    return this.newsService.setHot(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.newsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/image/:imageId')
  removeImage(@Param('id') id: number, @Param('imageId') imageId: number) {
    return this.newsService.removeImage(id, imageId);
  }
}
