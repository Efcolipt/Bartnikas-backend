import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly filesRepository: Repository<File>,
    private readonly configService: ConfigService,
  ) {}

  async upload(createFileDto: CreateFileDto, file: Express.Multer.File, type: string) {
    const appUrl = this.configService.get<string>('APP_URL');
    const appPort = this.configService.get<string>('APP_PORT');
    const url = `${appUrl}:${appPort}/${file.path.replace(/\\/gi, '/')}`;

    const fileData = {
      name: file.filename,
      original_name: file.originalname,
      url,
      path: file.path,
      type,
      mimetype: file.mimetype,
      size: file.size,
    };

    return await this.filesRepository.save(fileData);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} file`;
  // }

  async findByIds(ids: number[]) {
    return await this.filesRepository.findBy({
      id: In(ids),
    });
  }
}
