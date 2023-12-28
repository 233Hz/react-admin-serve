import { Controller, Get, ILogger, Inject } from '@midwayjs/core';
import { MidwayI18nService } from '@midwayjs/i18n';
import { RedisService } from '@midwayjs/redis';
import { CommonError } from '../common/common.error';

@Controller('/')
export class HomeController {
  @Inject()
  redisService: RedisService;

  @Inject()
  i18nService: MidwayI18nService;

  @Inject()
  logger: ILogger;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Get('/redis')
  async redis(): Promise<string> {
    // 设置值
    await this.redisService.set('token', '哈哈哈');
    return await this.redisService.get('token');
  }

  @Get('/i18n')
  async i18n(): Promise<string> {
    return await this.i18nService.translate('hello', { locale: 'en_US' });
  }

  @Get('/test-common-error')
  async testCommonError(): Promise<string> {
    throw new CommonError('error');
  }

  @Get('/test-midway-logger')
  async testMidwayLogger(): Promise<string> {
    this.logger.info('info');
    this.logger.warn('warn');
    this.logger.error('error');
    return 'ok';
  }
}
