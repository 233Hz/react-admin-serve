import {
  ApplicationContext,
  Autoload,
  CONTROLLER_KEY,
  IMidwayContainer,
  Init,
  Inject,
  MidwayWebRouterService,
  Singleton,
  attachClassMetadata,
  getClassMetadata,
  listModule,
} from '@midwayjs/core';

export const NOT_LOGIN_KEY = 'decorator:not.login';

export function NotLogin(): MethodDecorator {
  return (target, key, description: PropertyDescriptor) => {
    attachClassMetadata(NOT_LOGIN_KEY, { methadName: key }, target);
    return description;
  };
}

@Autoload()
@Singleton()
export class NotLoginDecorator {
  @Inject()
  webRouterService: MidwayWebRouterService;
  @ApplicationContext()
  applicationContext: IMidwayContainer;

  @Init()
  async init() {
    const modules = listModule(CONTROLLER_KEY);
    const whiteMethods = [];
    for (const module of modules) {
      const methadNames = getClassMetadata(NOT_LOGIN_KEY, module) || [];
      const className = module.name[0].toLowerCase() + module.name.slice(1);
      whiteMethods.push(
        ...methadNames.map(item => `${className}.${item.methadName}`)
      );
    }
    const routerTables = await this.webRouterService.getFlattenRouterTable();
    const whiteRouters = routerTables.filter(router =>
      whiteMethods.includes(router.handlerName)
    );
    this.applicationContext.registerObject('notLoginRouters', whiteRouters);
  }
}
