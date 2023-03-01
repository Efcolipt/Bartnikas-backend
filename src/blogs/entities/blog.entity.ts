import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  // CreateDateColumn,
  // UpdateDateColumn,
} from 'typeorm';
import { File } from '../../files/entities/file.entity';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  text: string;

  @ManyToMany(() => File, { cascade: true })
  @JoinTable()
  images: File[];

  @Column({ type: 'timestamp' })
  date: Date;

  // @CreateDateColumn()
  // created_at: Date;

  // @UpdateDateColumn()
  // updated_at: Date;
}
