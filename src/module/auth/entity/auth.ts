import { Entity } from 'typeorm';
import { BaseEntity } from '../../../common/base.entity';

@Entity('sys_auth')
export class AuthEntity extends BaseEntity {}
