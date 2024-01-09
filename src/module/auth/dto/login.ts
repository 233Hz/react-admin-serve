import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';
import { R } from '../../../common/base.error.util';

export class LoginDTO {
  @ApiProperty({ description: '登录账号' })
  @Rule(RuleType.string().required().error(R.validateError('登录账号不能为空')))
  accountNumber: string;

  @ApiProperty({ description: '密码' })
  @Rule(RuleType.string().required().error(R.validateError('密码不能为空')))
  password: string;

  @Rule(RuleType.string())
  captchaId: string;

  @ApiProperty({ description: '验证码' })
  @Rule(RuleType.string().required().error(R.validateError('验证码不能为空')))
  captcha: string;

  @ApiProperty({ description: '公钥' })
  // @Rule(RuleType.string().required().error(R.validateError('公钥不能为空')))
  publicKey: string;
}
