import { ApiProperty } from '@midwayjs/swagger';
import { BaseDTO } from '../../../common/base.dto';
import { Rule, RuleType } from '@midwayjs/validate';
import { RoleEntity } from '../entity/role';
import { R } from '../../../common/base.error.util';

export class RoleDTO extends BaseDTO<RoleEntity> {
  @ApiProperty({ description: '角色名称' })
  @Rule(RuleType.string().required().error(R.validateError('角色名称不能为空')))
  name: string;

  @ApiProperty({ description: '角色编号' })
  @Rule(RuleType.string().required().error(R.validateError('角色编号不能为空')))
  code: string;

  @ApiProperty({ description: '角色描述' })
  desc?: string;
}
