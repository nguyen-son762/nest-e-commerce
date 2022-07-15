import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  color_id: number;
  @Column()
  name: string;
  @Column()
  code: string;
}
