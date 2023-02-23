import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  img: string;

  @Column({ type: 'timestamp' })
  date: Date;
}
