import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column()
  phonenumber: string;
  @Column({ nullable: true, default: () => 'NOW()' })
  created_at: Date;
  @Column({ nullable: true, default: () => 'NOW()' })
  updated_at: Date;
}
