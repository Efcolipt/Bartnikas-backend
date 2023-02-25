import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
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
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
