import { Provide } from '@midwayjs/core';
import { UserRoleEntity } from '../entity/user.role';
import { InjectDataSource, InjectEntityModel } from '@midwayjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserRoleDTO } from '../dto/user.role';

@Provide()
export class UserRoleService {
  @InjectEntityModel(UserRoleEntity)
  userRoleModel: Repository<UserRoleEntity>;

  @InjectDataSource()
  dafaultDataSource: DataSource;

  /**
   * 设置用户角色
   */
  async setUserRole(userRole: UserRoleDTO) {
    const { userId, roleIds } = userRole;
    await this.dafaultDataSource.transaction(async manager => {
      await manager.delete(UserRoleEntity, { userId });
      const userRoles = roleIds.map(roleId => ({
        userId,
        roleId,
      }));
      await manager.insert(UserRoleEntity, userRoles);
    });
  }
}
