import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity';
import { seeds } from './data/seeds';

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

  async findOneBy(options: any) {
    return await this.filesRepository.findOneBy(options);
  }

  async findByIds(ids: number[]) {
    return await this.filesRepository.findBy({
      id: In(ids),
    });
  }

  async seed() {
    const appUrl = this.configService.get<string>('APP_URL');
    const appPort = this.configService.get<string>('APP_PORT');
    const urlBase = `${appUrl}:${appPort}/upload/images`;

    for (const s of seeds) {
      let file = await this.filesRepository.findOneBy({ name: s.name });
      if (file) continue;
      file = new File();

      const toUpdate = Object.assign(file, {
        ...s,
        url: `${urlBase}/${s.name}`,
      });
      await this.filesRepository.save(toUpdate);
    }
  }
}
