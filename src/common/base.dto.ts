import { ApiProperty } from '@midwayjs/swagger';
import { BaseEntity } from './base.entity';
import { Rule, RuleType } from '@midwayjs/validate';
import { omit } from '../utils/utils';

export class BaseDTO<T extends BaseEntity> {
  @ApiProperty()
  @Rule(RuleType.allow(null))
  id: number;

  entity(): T {
    return omit(this as unknown as T, [
      'createTime',
      'updateTime',
    ]) as unknown as T;
  }
}
