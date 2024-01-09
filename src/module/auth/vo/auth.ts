import { AuthEntity } from '../entity/auth';
import { PickVO } from '../../../utils/vo.utils';

export class AuthVO extends PickVO(AuthEntity, []) {}
