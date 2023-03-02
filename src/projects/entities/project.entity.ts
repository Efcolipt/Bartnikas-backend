import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  // CreateDateColumn,
  // UpdateDateColumn,
} from 'typeorm';
import { ProjectImage } from './project-image.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  desc: string;

  @ManyToMany(() => ProjectImage, { cascade: true })
  @JoinTable()
  project_images: ProjectImage[];

  // @CreateDateColumn()
  // created_at: Date;

  // @UpdateDateColumn()
  // updated_at: Date;
}
