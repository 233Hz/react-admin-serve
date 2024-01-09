import {
  ALL,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Provide,
} from '@midwayjs/decorator';
import { AuthService } from '../service/auth';
import { CaptchaService } from '@midwayjs/captcha';
import { LoginDTO } from '../dto/login';
import { R } from '../../../common/base.error.util';

@Provide()
@Controller('/auth')
export class AuthController {
  @Inject()
  authService: AuthService;
  @Inject()
  captchaService: CaptchaService;

  @Get('/captcha')
  async getImageCaptcha() {
    const { id, imageBase64 } = await this.captchaService.formula({
      height: 40,
      width: 120,
      noise: 1,
    });
    return { id, imageBase64 };
  }

  @Post('/login', { description: '登录' })
  async login(@Body(ALL) loginDTO: LoginDTO) {
    const { captchaId, captcha } = loginDTO;
    const result = await this.captchaService.check(captchaId, captcha);
    if (!result) throw R.error('验证码错误');
    return this.authService.login(loginDTO);
  }
}
