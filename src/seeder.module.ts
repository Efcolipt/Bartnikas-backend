import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { NewsModule } from './news/news.module';
import { BlogsModule } from './blogs/blogs.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      serveRoot: '/upload/images',
      rootPath: join(__dirname, '..', 'upload/images'),
    }),
    // ВАЖНО! СОХРАНИТЬ КОММЕНТ ВЫШЕ ДЛЯ ОБСЛУЖИВАНИЯ ДРУГИХ ДИРЕКТОРИЙ ИЗ UPLOAD
    // ServeStaticModule.forRoot({
    //   serveRoot: '/upload/videos',
    //   rootPath: join(__dirname, '..', 'upload/videos'),
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DATABASE_HOST'),
        port: Number(config.get('DATABASE_PORT')),
        username: config.get('DATABASE_USERNAME'),
        password: config.get('DATABASE_PASSWORD'),
        database: config.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: config.get('IS_DEV') === 'true',
      }),
    }),
    NewsModule,
    BlogsModule,
    ProjectsModule,
    AuthModule,
    UsersModule,
    FilesModule,
  ],
  providers: [SeederService],
})
export class SeederModule {}
