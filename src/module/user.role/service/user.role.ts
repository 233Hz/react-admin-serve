import { Provide } from '@midwayjs/core';
import { UserRoleEntity } from '../entity/user.role';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class UserRoleService {
  @InjectEntityModel(UserRoleEntity)
  userRoleModel: Repository<UserRoleEntity>;
}
