export function OmitVO<
  T extends new (...args: any[]) => any,
  K extends keyof InstanceType<T>
>(
  BaseClass: T,
  keys: K[]
): new (...args: ConstructorParameters<T>) => Omit<InstanceType<T>, K> {
  return class extends BaseClass {
    constructor(...args: any[]) {
      super(...args);
      keys.forEach(key => {
        delete (this as any)[key];
      });
    }
  } as any;
}

export function PickVO<
  T extends new (...args: any[]) => any,
  K extends keyof InstanceType<T>
>(
  BaseClass: T,
  keys: K[]
): new (...args: ConstructorParameters<T>) => Pick<InstanceType<T>, K> {
  return class extends BaseClass {
    constructor(...args: any[]) {
      super(...args);
      Object.keys(this).forEach(key => {
        if (!keys.includes(key as K)) {
          delete (this as any)[key];
        }
      });
    }
  } as any;
}
