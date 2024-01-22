import { Provide } from '@midwayjs/core';
import { RoleMenuEntity } from '../entity/role.menu';
import { InjectDataSource, InjectEntityModel } from '@midwayjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RoleMenuDTO } from '../dto/role.menu';

@Provide()
export class RoleMenuService {
  @InjectEntityModel(RoleMenuEntity)
  roleMenuModel: Repository<RoleMenuEntity>;

  @InjectDataSource()
  dafaultDataSource: DataSource;

  /**
   * 设置角色菜单权限
   */
  async setRoleMenu(roleMenu: RoleMenuDTO) {
    const { roleId, menuIds } = roleMenu;
    await this.dafaultDataSource.transaction(async manager => {
      await manager.delete(RoleMenuEntity, { roleId });
      const roleMenus = menuIds.map(menuId => ({
        roleId,
        menuId,
      }));
      await manager.insert(RoleMenuEntity, roleMenus);
    });
  }
}
