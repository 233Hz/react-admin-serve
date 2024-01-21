import { Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';

@Entity('sys_user_role')
export class UserRoleEntity extends BaseEntity {
  @PrimaryColumn({ comment: '用户id' })
  userId: number;
  @PrimaryColumn({ comment: '角色id' })
  roleId: number;
}
