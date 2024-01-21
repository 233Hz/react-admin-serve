import {
  ALL,
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
  Provide,
  Query,
} from '@midwayjs/core';
import { RoleService } from '../service/role';
import { RolePageQuery } from '../dto/role.page.query';
import { RoleDTO } from '../dto/role';

@Provide()
@Controller('/role')
export class RoleController {
  @Inject()
  roleService: RoleService;

  @Get('/list', { description: '查询所有' })
  async list() {
    return await this.roleService.list();
  }

  @Get('/page', { description: '分页' })
  async page(@Query(ALL) query: RolePageQuery) {
    const { current, size, name, code } = query;
    return await this.roleService.page(current, size, { name, code });
  }

  @Post('/saveOrUpdate', { description: '新增/修改' })
  async saveOrUpdate(@Body(ALL) data: RoleDTO) {
    return await this.roleService.save(data.entity());
  }

  @Del('/:id', { description: '删除' })
  async remove(@Param('id') id: number) {
    await this.roleService.delById(id);
  }
}
