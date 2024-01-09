import { ApiProperty } from '@midwayjs/swagger';
import { BaseEntity } from './base.entity';
import { Rule, RuleType } from '@midwayjs/validate';
import { omit } from 'lodash';

export class BaseDTO<T extends BaseEntity> {
  @ApiProperty()
  @Rule(RuleType.allow(null))
  id: number;

  entity(): T {
    return omit(this, ['createTime', 'updateTime']) as unknown as T;
  }
}
