import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_user')
export class User {
  @PrimaryGeneratedColumn() // 主键自增列
  id: number;

  @Column() // 普通列
  username: string;

  @Column()
  password: string;
}
