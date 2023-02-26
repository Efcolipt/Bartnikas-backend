import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  // CreateDateColumn,
  // UpdateDateColumn,
} from 'typeorm';
//import { Files } from '../.../files/entities/files.entity';

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  text: string;

  // @HasMany(() => Files)
  // files: Files[];

  @Column({ type: 'timestamp' })
  date: Date;

  // @CreateDateColumn()
  // created_at: Date;

  // @UpdateDateColumn()
  // updated_at: Date;
}
