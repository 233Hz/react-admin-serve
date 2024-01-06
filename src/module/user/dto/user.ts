import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';
import { R } from '../../../common/base.error.util';
import { EmailRule, PhoneRule } from '../../../common/common.validate.rule';
import { BaseDTO } from '../../../common/base.dto';
import { UserEntity } from '../entity/user';

export enum Gender {
  MAN = 1,
  GIRL = 2,
}

export class UserDTO extends BaseDTO<UserEntity> {
  @ApiProperty({ description: '用户名' })
  @Rule(RuleType.string().required().error(R.validateError('用户名不能为空')))
  username: string;

  @ApiProperty({ description: '用户昵称' })
  @Rule(RuleType.string().required().error(R.validateError('用户昵称不能为空')))
  nickname: string;

  @ApiProperty({ description: '手机号' })
  @Rule(PhoneRule.error(R.validateError('手机号格式不正确')))
  phone: string;

  @ApiProperty({ description: '邮箱' })
  @Rule(EmailRule.error(R.validateError('邮箱格式不正确')))
  email: string;

  @ApiProperty({ description: '性别(1.男 2.女)', nullable: true })
  @Rule(
    RuleType.valid(...Object.values(Gender)).error(
      R.validateError('性别不正确(1.男 2.女)')
    )
  )
  gender?: number;

  @ApiProperty({ description: '头像', nullable: true })
  avatar?: string;
}
