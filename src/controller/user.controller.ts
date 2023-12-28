import { Body, Controller, Get, Post } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user';
import { UserDTO } from '../dto/user';

@Controller('/user')
export class UserController {
  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Get('/list')
  async userList(): Promise<User[]> {
    return this.userModel.find();
  }

  @Post('/save')
  async save(@Body() user: UserDTO): Promise<void> {
    console.log(user);
  }
}
