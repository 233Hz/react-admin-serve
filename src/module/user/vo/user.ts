import { OmitVO } from '../../../utils/vo.utils';
import { UserEntity } from '../entity/user';

export class UserVO extends OmitVO(UserEntity, ['password']) {}
