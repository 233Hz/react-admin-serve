import { ApiProperty } from '@midwayjs/swagger';

export class BasePageDTO {
  @ApiProperty({ type: 'number', description: '当前页', example: 1 })
  current = 1;
  @ApiProperty({ type: 'number', description: '每页条数', example: 10 })
  size = 10;
}
