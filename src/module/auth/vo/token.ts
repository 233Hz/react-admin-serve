import { ApiProperty } from '@midwayjs/swagger';

export class TokenVO {
  @ApiProperty({ description: '过期时间' })
  expire: number;

  @ApiProperty({ description: 'token' })
  token: string;

  @ApiProperty({ description: '刷新过期时间' })
  refreshExpire: number;

  @ApiProperty({ description: '刷新token' })
  refreshToken: string;
}
