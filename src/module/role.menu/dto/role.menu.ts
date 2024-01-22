import { Rule, RuleType } from '@midwayjs/validate';
import { R } from '../../../common/base.error.util';
import { ApiProperty } from '@midwayjs/swagger';

export class RoleMenuDTO {
  @ApiProperty({ type: Number, description: '角色ID', required: true })
  @Rule(RuleType.number().required().error(R.validateError('角色ID不能为空')))
  roleId: number;

  @ApiProperty({ type: Number, description: '菜单权限id', required: true })
  @Rule(
    RuleType.array()
      .items(RuleType.number())
      .required()
      .error(R.validateError('请选择菜单权限'))
  )
  menuIds: number[];
}
