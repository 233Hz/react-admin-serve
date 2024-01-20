import { Config, Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDTO } from '../dto/login';
import { TokenVO } from '../vo/token';
import { UserEntity } from '../../user/entity/user';
import { R } from '../../../common/base.error.util';
import * as bcrypt from 'bcryptjs';
import { TokenConfig } from '../../../interface/token.config';
import { uuid } from '../../../utils/uuid';
import { RedisService } from '@midwayjs/redis';
import { RefreshToken } from '../dto/refresh.token';

@Provide()
export class AuthService {
  @InjectEntityModel(UserEntity)
  userModel: Repository<UserEntity>;

  @Config('token')
  tokenConfig: TokenConfig;

  @Inject()
  redisService: RedisService;

  async login(loginDTO: LoginDTO): Promise<TokenVO> {
    const { accountNumber, password } = loginDTO;
    const user = await this.userModel
      .createQueryBuilder('user')
      .where('user.phone = :accountNumber', { accountNumber })
      .orWhere('user.username = :accountNumber', { accountNumber })
      .orWhere('user.email = :accountNumber', { accountNumber })
      .select(['user.password', 'user.id'])
      .getOne();
    if (!user) throw R.error('账号不存在');

    if (!bcrypt.compareSync(password, user.password)) throw R.error('密码错误');
    const { expire, refreshExpire } = this.tokenConfig;

    const token = uuid();
    const refreshToken = uuid();

    // multi可以实现redis指令并发执行
    await this.redisService
      .multi()
      .set(`token:${token}`, JSON.stringify({ userId: user.id, refreshToken }))
      .expire(`token:${token}`, expire)
      .set(`refreshToken:${refreshToken}`, user.id)
      .expire(`refreshToken:${refreshToken}`, refreshExpire)
      .exec();

    return {
      expire,
      token,
      refreshExpire,
      refreshToken,
    };
  }

  async logout(token: string, refreshToken: string): Promise<boolean> {
    const res = await this.redisService
      .multi()
      .del(`token:${token}`)
      .del(`refreshToken:${refreshToken}`)
      .exec();
    if (res.some(r => r[0])) throw R.error('退出登入失败');
    return true;
  }

  async refreshToken(data: RefreshToken): Promise<TokenVO> {
    const userId = await this.redisService.get(
      `refreshToken:${data.refreshToken}`
    );
    if (!userId) throw R.error('用户凭证已过期请重新登入');
    const { expire } = this.tokenConfig;
    const token = uuid();
    this.redisService
      .multi()
      .set(`token:${token}`, userId)
      .expire(`token:${token}`, expire)
      .exec();

    const refreshExpire = await this.redisService.ttl(
      `refreshToken:${data.refreshToken}`
    );

    return {
      expire,
      token,
      refreshExpire,
      refreshToken: data.refreshToken,
    };
  }
}
