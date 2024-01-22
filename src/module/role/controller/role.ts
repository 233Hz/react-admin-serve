import {
  ALL,
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@midwayjs/core';
import { RoleService } from '../service/role';
import { RolePageQuery } from '../dto/role.page.query';
import { RoleDTO } from '../dto/role';
import { RoleMenuService } from '../../role.menu/service/role.menu';
import { RoleMenuDTO } from '../../role.menu/dto/role.menu';

@Controller('/role')
export class RoleController {
  @Inject()
  roleService: RoleService;

  @Inject()
  roleMenuService: RoleMenuService;

  @Get('/list', { description: '查询所有' })
  async list() {
    return await this.roleService.list(null, {
      id: true,
      name: true,
      code: true,
    });
  }

  @Get('/page', { description: '分页查询' })
  async page(@Query(ALL) query: RolePageQuery) {
    const { current, size, ...argsQuery } = query;
    return await this.roleService.page(current, size, { ...argsQuery });
  }

  @Post('/saveOrUpdate', { description: '新增/修改' })
  async saveOrUpdate(@Body(ALL) data: RoleDTO) {
    return await this.roleService.save(data.entity());
  }

  @Del('/:id', { description: '删除' })
  async remove(@Param('id') id: number) {
    await this.roleService.delById(id);
  }

  @Post('/setRoleMenu', { description: '设置角色菜单权限' })
  async setRoleMenu(@Body(ALL) data: RoleMenuDTO) {
    return await this.roleMenuService.setRoleMenu(data);
  }
}
