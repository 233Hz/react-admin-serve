import { Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class BaseService<T extends BaseEntity> {
  @Inject()
  ctx: Context;

  abstract getModel(): Repository<T>;

  async save(entity: T) {
    return await this.getModel().save(entity);
  }

  async update(entity: T) {
    return await this.getModel().save(entity);
  }

  async remove(entity: T) {
    return await this.getModel().remove(entity);
  }

  async getById(id: number) {
    return await this.getModel()
      .createQueryBuilder('model')
      .where('model,id = :id', { id })
      .getOne();
  }

  async page(current = 0, size = 10, where?: FindOptionsWhere<T>) {
    const order: any = { createTime: 'desc' };
    const [data, total] = await this.getModel().findAndCount({
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

  async list(where?: FindOptionsWhere<T>) {
    const order: any = { createTime: 'desc' };
    const data = await this.getModel().find({ where, order });
    return data.map(entity => entity.vo());
  }
}
