import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async findOne(username: string) {
    return await this.usersRepository.findOneBy({ username });
  }

  async seed() {
    const username = this.configService.get<string>('ADMIN_LOGIN');
    const password = this.configService.get<string>('ADMIN_PASSWORD');

    const salt = await bcrypt.genSaltSync(10);
    const passwordToSave = await bcrypt.hashSync(password, salt);

    let user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      user = new User();
      user.username = username;
    }
    user.password = passwordToSave;

    return this.usersRepository.save(user);
  }
}
