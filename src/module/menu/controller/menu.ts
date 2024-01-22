import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  ALL,
  Param,
  Del,
} from '@midwayjs/decorator';
import { MenuDTO } from '../dto/menu';
import { MenuService } from '../service/menu';

@Controller('/menu')
export class MenuController {
  @Inject()
  menuService: MenuService;

  @Get('/:id', { description: '根据id查询' })
  async getById(@Param('id') id: number) {
    return await this.menuService.findById(id);
  }

  @Get('/list/tree', { description: '查询树形列表' })
  async treeList() {
    return await this.menuService.treeList();
  }

  @Post('/saveOrUpdate', { description: '新增/修改' })
  async saveOrUpdate(@Body(ALL) data: MenuDTO) {
    return await this.menuService.saveOrUpdate(data.entity());
  }

  @Del('/:id', { description: '删除' })
  async remove(@Param('id') id: number) {
    await this.menuService.removeById(id);
  }
}
