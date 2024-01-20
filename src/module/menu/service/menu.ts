import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../common/base.service';
import { MenuEntity } from '../entity/menu';

@Provide()
export class MenuService extends BaseService<MenuEntity> {
  @InjectEntityModel(MenuEntity)
  menuModel: Repository<MenuEntity>;

  getModel(): Repository<MenuEntity> {
    return this.menuModel;
  }
}
