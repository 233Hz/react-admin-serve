import { Provide } from '@midwayjs/core';
import { BaseService } from '../../../common/base.service';
import { RoleEntity } from '../entity/role';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class RoleService extends BaseService<RoleEntity> {
  @InjectEntityModel(RoleEntity)
  roleModel: Repository<RoleEntity>;

  getModel(): Repository<RoleEntity> {
    return this.roleModel;
  }
}
