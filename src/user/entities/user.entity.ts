import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    unique: true,
    length: 100,
  })
  username: string;

  @Column({
    length: 255,
  })
  password: string;
}
