import { Inject, Provide, Singleton } from '@midwayjs/core';
import { RedisService } from '@midwayjs/redis';
import * as NodeRSA from 'node-rsa';
import { R } from './base.error.util';

@Provide()
@Singleton()
export class RasService {
  @Inject()
  redisService: RedisService;

  async getPublicKey() {
    const key = new NodeRSA({ b: 512 });
    const publicKey = key.exportKey('public');
    const privateKey = key.exportKey('private');
    await this.redisService.set(`publicKey:${publicKey}`, privateKey);
    return publicKey;
  }

  async decrypt(publicKey: string, data: string) {
    const privateKey = await this.redisService.get(`publicKey:${publicKey}`);
    await this.redisService.del(`publicKey:${publicKey}`);
    if (!privateKey) throw R.error('解密私钥错误或已失效');
    const decrypt = new NodeRSA(privateKey);
    decrypt.setOptions({ encryptionScheme: 'pkcs1' });
    return decrypt.decrypt(data, 'utf8');
  }
}
