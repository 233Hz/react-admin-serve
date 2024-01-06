import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../common/base.service';
import { UserEntity } from '../entity/user';
import { UserVO } from '../vo/user';
import { R } from '../../../common/base.error.util';
import * as bcrypt from 'bcryptjs';

@Provide()
export class UserService extends BaseService<UserEntity> {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  getModel(): Repository<UserEntity> {
    return this.userModel;
  }

  async createUser(entity: UserEntity): Promise<UserVO> {
    const { username, nickname, phone, email } = entity;
    let isExist = (await this.userModel.countBy({ username })) > 0;
    if (isExist) throw R.error('用户名存在');
    isExist = (await this.userModel.countBy({ nickname })) > 0;
    if (isExist) throw R.error('昵称存在');
    isExist = (await this.userModel.countBy({ phone })) > 0;
    if (isExist) throw R.error('手机号存在');
    isExist = (await this.userModel.countBy({ email })) > 0;
    if (isExist) throw R.error('邮箱存在');
    entity.password = bcrypt.hashSync('123456', 'BUNGA');
    await this.userModel.save(entity);
    return entity.vo();
  }
}
