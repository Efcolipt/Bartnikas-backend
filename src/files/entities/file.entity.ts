import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  // CreateDateColumn,
  // UpdateDateColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  original_name: string;

  @Column()
  url: string;

  @Column()
  path: string;

  @Column()
  type: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;
  // @CreateDateColumn()
  // created_at: Date;

  // @UpdateDateColumn()
  // updated_at: Date;
}
