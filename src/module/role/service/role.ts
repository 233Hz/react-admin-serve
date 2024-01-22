import { Inject, Provide } from '@midwayjs/core';
import { BaseService } from '../../../common/base.service';
import { RoleEntity } from '../entity/role';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { RoleMenuService } from '../../role.menu/service/role.menu';

@Provide()
export class RoleService extends BaseService<RoleEntity> {
  @InjectEntityModel(RoleEntity)
  roleModel: Repository<RoleEntity>;

  @Inject()
  roleMenuService: RoleMenuService;

  getModel(): Repository<RoleEntity> {
    return this.roleModel;
  }
}
