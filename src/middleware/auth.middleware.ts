import {
  IMiddleware,
  Inject,
  Middleware,
  MidwayWebRouterService,
  RouterInfo,
} from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { R } from '../common/base.error.util';
import { RedisService } from '@midwayjs/redis';

@Middleware()
export class AuthMiddleware implements IMiddleware<Context, NextFunction> {
  @Inject()
  redisService: RedisService;
  @Inject()
  webRouterservice: MidwayWebRouterService;
  @Inject()
  notLoginRouters: RouterInfo[];

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const routerInfo = await this.webRouterservice.getMatchedRouterInfo(
        ctx.path,
        ctx.method
      );
      if (!routerInfo) {
        await next();
        return;
      }
      if (
        this.notLoginRouters.some(
          router =>
            router.requestMethod === routerInfo.requestMethod &&
            router.url === routerInfo.url
        )
      ) {
        await next();
        return;
      }

      const token = ctx.header.authorization?.replace('Bearer ', '');
      if (!token) throw R.unauthorizedError();
      const userInfo = await this.redisService.get(`token:${token}`);
      if (!userInfo) throw R.unauthorizedError();
      ctx.userInfo = JSON.parse(userInfo);
      return next();
    };
  }
  static getName(): string {
    return 'auth';
  }
}
