import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Provide,
  Query,
  ALL,
  Put,
  Param,
  Del,
} from '@midwayjs/decorator';
import { UserDTO } from '../dto/user';
import { UserService } from '../service/user';

@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Post('/', { description: '创建用户' })
  async create(@Body(ALL) data: UserDTO) {
    return await this.userService.createUser(data.entity());
  }
}
