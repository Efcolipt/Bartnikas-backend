import {
  Controller,
  Body,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
//import { Controller, Body, Post, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
//import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { genOpts } from './data/storage.config';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  //@UseGuards(JwtAuthGuard)
  @Post('image')
  @UseInterceptors(FileInterceptor('file', genOpts('images')))
  async uploadImage(
    @Body() createFileDto: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.filesService.upload(createFileDto, file, 'image');
  }

  // @UseGuards(JwtAuthGuard)
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.filesService.remove(id);
  // }
}
