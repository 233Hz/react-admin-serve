import { Provide } from '@midwayjs/core';
import { RoleMenuEntity } from '../entity/role.menu';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class RoleMenuService {
  @InjectEntityModel(RoleMenuEntity)
  roleMenuModel: Repository<RoleMenuEntity>;
}
