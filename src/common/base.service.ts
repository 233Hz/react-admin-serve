import { Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { FindOptionsSelect, FindOptionsWhere, In, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { R } from './base.error.util';

export abstract class BaseService<T extends BaseEntity> {
  @Inject()
  ctx: Context;

  abstract getModel(): Repository<T>;

  async save(entity: T) {
    return await this.getModel().save(entity);
  }

  async update(entity: T) {
    const { id } = entity;
    if (!id) throw R.validateError('id 不能为空');
    return await this.getModel().save(entity);
  }

  async delById(id: number) {
    return await this.getModel().delete(id);
  }

  async findById(id: number) {
    return await this.getModel().findOneBy({ id } as FindOptionsWhere<T>);
  }

  async findByIds(ids: number[]) {
    return await this.getModel().findBy({ id: In(ids) } as FindOptionsWhere<T>);
  }

  async findOne(where: FindOptionsWhere<T>) {
    return await this.getModel().findOneBy(where);
  }

  async page(
    current = 0,
    size = 10,
    where?: FindOptionsWhere<T>,
    select?: FindOptionsSelect<T>
  ) {
    const order: any = { createTime: 'desc' };
    const [data, total] = await this.getModel().findAndCount({
      select,
      where,
      order,
      skip: current * size,
      take: size,
    });
    return {
      data: data.map(entity => entity.vo()),
      total,
    };
  }

  async list(where?: FindOptionsWhere<T>, select?: FindOptionsSelect<T>) {
    const order: any = { createTime: 'desc' };
    const data = await this.getModel().find({
      select,
      where,
      order,
    });
    return data.map(entity => entity.vo());
  }
}
