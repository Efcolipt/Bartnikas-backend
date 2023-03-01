import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then((appContext: any) => {
      //const logger = appContext.get(Logger);
      const seeder = appContext.get(SeederService);
      seeder
        .seed()
        .then(() => {
          console.log('Seeding complete!');
          //logger.debug('Seeding complete!');
        })
        .catch((error: any) => {
          console.error('Seeding failed!');
          //logger.error('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error: any) => {
      throw error;
    });
}
bootstrap();
