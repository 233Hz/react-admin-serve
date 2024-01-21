import {
  ALL,
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
  Provide,
} from '@midwayjs/decorator';
import { AuthService } from '../service/auth';
import { CaptchaService } from '@midwayjs/captcha';
import { RasService } from '../../../common/ras.service';
import { LoginDTO } from '../dto/login';
import { R } from '../../../common/base.error.util';
import { RefreshToken } from '../dto/refresh.token';
import { NotLogin } from '../../../decorator/not.login';
import { Context } from '@midwayjs/koa';
import { UserService } from '../../user/service/user';
import { ApiBasicAuth } from '@midwayjs/swagger';

@Provide()
@Controller('/auth')
export class AuthController {
  @Inject()
  ctx: Context;
  @Inject()
  authService: AuthService;
  @Inject()
  userService: UserService;
  @Inject()
  captchaService: CaptchaService;
  @Inject()
  rasService: RasService;

  @NotLogin()
  @Get('/captcha', { description: '获取验证码' })
  async getImageCaptcha() {
    const { id, imageBase64 } = await this.captchaService.formula({
      height: 40,
      width: 120,
      noise: 1,
    });
    return { id, imageBase64 };
  }

  @NotLogin()
  @Get('/publicKey', { description: '获取公钥' })
  async getPublicKey() {
    return this.rasService.getPublicKey();
  }

  @NotLogin()
  @ApiBasicAuth()
  @Post('/login', { description: '登录' })
  async login(@Body(ALL) loginDTO: LoginDTO) {
    const { captchaId, captcha, publicKey } = loginDTO;
    const result = await this.captchaService.check(captchaId, captcha);
    if (!result) throw R.error('验证码错误');
    // 解密
    const password = await this.rasService.decrypt(
      publicKey,
      loginDTO.password
    );

    if (!password) throw R.error('密码错误');

    loginDTO.password = password;

    return this.authService.login(loginDTO);
  }

  @Get('/logout', { description: '退出登录' })
  async logout(@Headers('Authorization') token: string) {
    return this.authService.logout(
      token.replace('Bearer ', ''),
      this.ctx.userInfo.refreshToken
    );
  }

  @Post('/refresh/token', { description: '刷新token' })
  async refreshToken(@Body() data: RefreshToken) {
    return this.authService.refreshToken(data);
  }

  @Get('/userInfo', { description: '获取用户信息' })
  async getUserInfo() {
    return this.userService.getById(+this.ctx.userInfo.userId);
  }
}
