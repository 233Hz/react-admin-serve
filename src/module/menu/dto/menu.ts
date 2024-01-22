import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';
import { R } from '../../../common/base.error.util';
import { MenuEntity } from '../entity/menu';
import { BaseDTO } from '../../../common/base.dto';

export enum MenuType {
  MENU = 1,
  BUTTON = 2,
}

export class MenuDTO extends BaseDTO<MenuEntity> {
  @ApiProperty({ description: '父节点' })
  @Rule(RuleType.number().required().error(R.validateError('父节点不能为空')))
  pid: number;

  @ApiProperty({ description: '菜单名称' })
  @Rule(RuleType.string().required().error(R.validateError('菜单名称不能为空')))
  name: string;

  @ApiProperty({ description: '菜单编号' })
  @Rule(RuleType.string().required().error(R.validateError('菜单编号不能为空')))
  code: string;

  @ApiProperty({ description: '菜单类型' })
  @Rule(
    RuleType.valid(...Object.values(MenuType)).error(
      R.validateError('菜单类型不能为空或者菜单类型错误(1.菜单 2.按钮)')
    )
  )
  type: string;

  @ApiProperty({ description: '菜单路径' })
  path?: string;

  @ApiProperty({ description: '重定向地址' })
  redirect?: string;

  @ApiProperty({ description: '是否缓存页面' })
  keepAlive?: boolean;

  @ApiProperty({ description: '只有一个子菜单是否只显示子菜单' })
  onlyChildHideFolder?: boolean;

  @ApiProperty({ description: '是否不显示菜单' })
  hidden?: boolean;
}
