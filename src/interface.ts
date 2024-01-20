import '@midwayjs/core';

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: number;
}

declare module '@midwayjs/core' {
  interface Context {
    userInfo: {
      userId: string;
      refreshToken: string;
    };
  }
}
