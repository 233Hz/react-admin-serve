import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';
import { MenuVO } from '../vo/menu';

@Entity('sys_menu')
export class MenuEntity extends BaseEntity {
  @Column({ comment: '菜单名称' })
  name: string;
  @Column({ comment: '菜单编号' })
  code: string;
  @Column({ comment: '菜单类型(1.菜单 2.按钮)' })
  type: number;
  @Column({ comment: '菜单路径', nullable: true })
  path?: string;
  @Column({ comment: '菜单图标', nullable: true })
  icon?: string;
  @Column({ comment: '重定向地址', nullable: true })
  redirect?: string;
  @Column({ comment: '是否缓存页面', nullable: true })
  keepAlive?: boolean;
  @Column({ comment: '只有一个子菜单是否只显示子菜单', nullable: true })
  onlyChildHideFolder?: boolean;
  @Column({ comment: '是否不显示菜单', nullable: true })
  hidden?: boolean;

  vo(): MenuVO {
    return this;
  }
}
