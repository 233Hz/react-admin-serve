import { Rule, RuleType } from '@midwayjs/validate';
import { R } from '../../../common/base.error.util';
import { ApiProperty } from '@midwayjs/swagger';

export class UserRoleDTO {
  @ApiProperty({ type: Number, description: '用户ID', required: true })
  @Rule(RuleType.number().required().error(R.validateError('用户ID不能为空')))
  userId: number;

  @ApiProperty({ type: Number, description: '角色id', required: true })
  @Rule(
    RuleType.array()
      .items(RuleType.number())
      .required()
      .error(R.validateError('请选择分配角色'))
  )
  roleIds: number[];
}
