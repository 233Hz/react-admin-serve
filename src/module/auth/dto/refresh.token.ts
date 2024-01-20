import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { R } from '../../../common/base.error.util';

export class RefreshToken {
  @ApiProperty({ description: '刷新token' })
  @Rule(
    RuleType.string()
      .required()
      .error(R.validateError('用户凭证已过期，请重新登入'))
  )
  refreshToken: string;
}
