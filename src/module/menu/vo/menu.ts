import { MenuEntity } from '../entity/menu';

export class MenuVO extends MenuEntity {
  children?: MenuVO[];
}
