import { Addon } from './entities/addon.entity';
import { ADDON_REPOSITORY } from '../../core/constants';

export const addonsProviders = [
  {
    provide: ADDON_REPOSITORY,
    useValue: Addon,
  },
];
