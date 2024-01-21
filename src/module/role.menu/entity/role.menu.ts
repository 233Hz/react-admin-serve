import { Entity, PrimaryColumn } from 'typeorm';

@Entity('sys_role_menu')
export class RoleMenuEntity {
  @PrimaryColumn({ comment: '用户id' })
  userId: number;
  @PrimaryColumn({ comment: '角色id' })
  roleId: number;
}
