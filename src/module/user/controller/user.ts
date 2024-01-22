import {
  Body,
  Controller,
  Inject,
  Post,
  ALL,
  Get,
  Query,
  Put,
  Del,
  Param,
} from '@midwayjs/decorator';
import { UserDTO } from '../dto/user';
import { UserService } from '../service/user';
import { UserPageQuery } from '../dto/user.page.query';
import { UserRoleService } from '../../user.role/service/user.role';
import { UserRoleDTO } from '../../user.role/dto/user.role';

@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  userRoleService: UserRoleService;

  @Get('/list', { description: '查询所有用户' })
  async list() {
    return this.userService.list(null, {
      id: true,
      username: true,
      nickname: true,
    });
  }

  @Post('', { description: '创建用户' })
  async create(@Body(ALL) data: UserDTO) {
    return await this.userService.createUser(data.entity());
  }

  @Get('/page', { description: '分页查询' })
  async page(@Query(ALL) query: UserPageQuery) {
    const { current, size, ...argsQuery } = query;
    return await this.userService.page(current, size, { ...argsQuery });
  }

  @Put('', { description: '修改' })
  async edit(@Body(ALL) data: UserDTO) {
    return await this.userService.update(data.entity());
  }

  @Del('/:id', { description: '删除' })
  async remove(@Param('id') id: number) {
    await this.userService.delById(id);
  }

  @Post('/setUserRole', { description: '设置用户角色' })
  async setRoleMenu(@Body(ALL) data: UserRoleDTO) {
    return await this.userRoleService.setUserRole(data);
  }
}
