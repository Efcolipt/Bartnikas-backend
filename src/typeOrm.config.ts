import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
// Models
import { User } from './users/entities/user.entity';
import { Project } from './projects/entities/project.entity';
import { ProjectImage } from './projects/entities/project-image.entity';
import { News } from './news/entities/news.entity';
import { File } from './files/entities/file.entity';
import { Blog } from './blogs/entities/blog.entity';
// Migrations
import { start1677731212577 } from './migrations/1677731212577-start';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: Number(configService.get('DATABASE_PORT')),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [ User, Project, ProjectImage, News, File, Blog ],
  migrations: [start1677731212577],
  // cli: {
  //   migrationsDir: 'src/migration'
  // }
  //cli: { migrationsDir: 'src/migrations' },
});
