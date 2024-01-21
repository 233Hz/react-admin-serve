import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Provide,
  Query,
  ALL,
  Param,
  Del,
} from '@midwayjs/decorator';
import { MenuDTO } from '../dto/menu';
import { MenuService } from '../service/menu';

@Provide()
@Controller('/menu')
export class MenuController {
  @Inject()
  menuService: MenuService;

  @Post('/saveOrUpdate', { description: '新增/修改' })
  async saveOrUpdate(@Body(ALL) data: MenuDTO) {
    return await this.menuService.save(data.entity());
  }

  @Del('/:id', { description: '删除' })
  async remove(@Param('id') id: number) {
    await this.menuService.delById(id);
  }

  @Get('/:id', { description: '根据id查询' })
  async getById(@Param('id') id: number) {
    return await this.menuService.getById(id);
  }

  @Get('/page', { description: '分页查询' })
  async page(@Query('page') page: number, @Query('size') size: number) {
    return await this.menuService.page(page, size);
  }

  @Get('/list', { description: '查询全部' })
  async list() {
    return await this.menuService.list();
  }
}
