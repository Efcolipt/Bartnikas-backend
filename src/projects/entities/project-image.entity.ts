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
export class ProjectImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => File, { cascade: true, eager: true })
  @JoinTable()
  files: File[];

  // @CreateDateColumn()
  // created_at: Date;

  // @UpdateDateColumn()
  // updated_at: Date;
}
