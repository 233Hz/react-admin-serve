import { ApiProperty } from '@midwayjs/swagger';
import { BasePageDTO } from '../../../common/base.page.dto';

export class RolePageQuery extends BasePageDTO {
  @ApiProperty({ type: 'string', description: '角色名称', example: '管理员' })
  name?: string;

  @ApiProperty({ type: 'string', description: '角色编号', example: 'ADMIN' })
  code?: string;
}
