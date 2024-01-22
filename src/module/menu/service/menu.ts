import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../common/base.service';
import { MenuEntity } from '../entity/menu';
import { MenuVO } from '../vo/menu';
import { RedisService } from '@midwayjs/redis';

@Provide()
export class MenuService extends BaseService<MenuEntity> {
  @InjectEntityModel(MenuEntity)
  menuModel: Repository<MenuEntity>;

  @Inject()
  redisService: RedisService;

  getModel(): Repository<MenuEntity> {
    return this.menuModel;
  }

  async saveOrUpdate(menu: MenuEntity) {
    // 删除 menu:tree 缓存
    await this.redisService.del('menu:tree');
    return await this.menuModel.save(menu);
  }

  async removeById(id: number) {
    // 删除 menu:tree 缓存
    await this.redisService.del('menu:tree');
    return await this.menuModel.delete(id);
  }

  async treeList() {
    const menuTree = await this.redisService.get('menu:tree');
    if (menuTree) return JSON.parse(menuTree);
    const menuList: MenuVO[] = await this.menuModel.find();
    const menuMap = {};
    menuList.forEach(menu => (menuMap[menu.id] = menu));

    const treeList: MenuVO[] = [];
    menuList.forEach(menu => {
      const parent = menuMap[menu.pid];
      if (parent) {
        parent.children
          ? parent.children.push(menu)
          : (parent.children = [menu]);
      } else {
        treeList.push(menu);
      }
    });
    await this.redisService.set('menu:tree', JSON.stringify(treeList));
    return treeList;
  }
}
