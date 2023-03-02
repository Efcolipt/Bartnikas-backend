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
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  desc: string;

  @Column({ type: 'longtext' })
  text: string;

  @Column('boolean', { default: false })
  is_hot: boolean = false;

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
