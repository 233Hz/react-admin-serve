import { Rule, RuleType } from '@midwayjs/validate';

export class UserDTO {
  @Rule(RuleType.number().required().error(new Error('error'))) // id不能为空，并且是数字
  id: number;

  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;
}
