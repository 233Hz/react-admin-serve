import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ comment: '主键', name: 'id', type: 'bigint' })
  id: number;
  @CreateDateColumn({ comment: '创建时间' })
  createTime: Date;
  @UpdateDateColumn({ comment: '更新时间' })
  updateTime: Date;
  vo?(): any {
    return this;
  }
}
