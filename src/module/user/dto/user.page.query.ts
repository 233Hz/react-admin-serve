import { ApiProperty } from '@midwayjs/swagger';
import { BasePageDTO } from '../../../common/base.page.dto';
import { Rule, RuleType } from '@midwayjs/validate';
import { GenderEnum } from './user';
import { R } from '../../../common/base.error.util';

export class UserPageQuery extends BasePageDTO {
  @ApiProperty({ type: String, description: '用户名', example: 'admin' })
  username?: string;

  @ApiProperty({ type: String, description: '用户昵称', example: '管理员' })
  nickname?: string;

  @ApiProperty({
    type: Number,
    description: '性别(1.男 2.女)',
    example: '管理员',
  })
  @Rule(
    RuleType.valid(...Object.values(GenderEnum)).error(
      R.validateError('性别不正确(1.男 2.女)')
    )
  )
  gender?: number;
}
