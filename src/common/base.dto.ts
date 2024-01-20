import { ApiProperty } from '@midwayjs/swagger';
import { BaseEntity } from './base.entity';
import { Rule, RuleType } from '@midwayjs/validate';

export class BaseDTO<T extends BaseEntity> {
  @ApiProperty()
  @Rule(RuleType.number().allow(null))
  id: number;

  entity(): T {
    return this as unknown as T;
  }
}
