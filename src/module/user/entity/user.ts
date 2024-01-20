import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { UserVO } from '../vo/user';
import { omit } from '../../../utils/utils';

@Entity('sys_user')
export class UserEntity extends BaseEntity {
  @Column({ comment: '用户名' })
  username: string;

  @Column({ comment: '用户昵称' })
  nickname: string;

  @Column({ comment: '密码' })
  password: string;

  @Column({ comment: '邮箱' })
  email: string;

  @Column({ comment: '电话' })
  phone: string;

  @Column({ comment: '性别(1.男 2.女)', nullable: true })
  gender?: number;

  @Column({ comment: '头像', nullable: true })
  avatar?: string;

  vo(): UserVO {
    return omit(this, ['password']);
  }
}
