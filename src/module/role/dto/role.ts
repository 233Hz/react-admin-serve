import { ApiProperty } from '@midwayjs/swagger';
import { BaseDTO } from '../../../common/base.dto';
import { Rule, RuleType } from '@midwayjs/validate';
import { RoleEntity } from '../entity/role';
import { R } from '../../../common/base.error.util';

export class RoleDTO extends BaseDTO<RoleEntity> {
  @ApiProperty({ type: String, description: '角色名称', required: true })
  @Rule(RuleType.string().required().error(R.validateError('角色名称不能为空')))
  name: string;

  @ApiProperty({ type: String, description: '角色编号', required: true })
  @Rule(RuleType.string().required().error(R.validateError('角色编号不能为空')))
  code: string;

  @ApiProperty({ type: String, description: '角色描述' })
  desc?: string;
}
