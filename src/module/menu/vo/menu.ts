import { MenuEntity } from '../entity/menu';
import { OmitVO } from '../../../utils/vo.utils';

export class MenuVO extends OmitVO(MenuEntity, []) {}
