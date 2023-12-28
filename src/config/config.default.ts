import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1703745971420_9693',
  koa: {
    port: 7001,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'admin',
        database: 'react-admin-db',
        synchronize: true, // 实体与表同步 调试模式下开始。不然会有强替换导致数据丢是
        logging: true,
        entities: ['**/entity/*{.ts,.js}'], // 扫描entity文件夹
      },
    },
  },
  redis: {
    client: {
      port: 6379,
      host: 'localhost',
      password: 'admin',
      db: 0,
    },
  },
  i18n: {
    localeTable: {
      en_US: require('../locales/en_US.json'),
      zh_CN: require('../locales/zh_CN.json'),
    },
  },
} as MidwayConfig;
