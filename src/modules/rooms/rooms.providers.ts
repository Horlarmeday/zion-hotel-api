import { Room } from './entities/room.entity';
import { ROOM_REPOSITORY } from '../../core/constants';

export const roomsProviders = [
  {
    provide: ROOM_REPOSITORY,
    useValue: Room,
  },
];
