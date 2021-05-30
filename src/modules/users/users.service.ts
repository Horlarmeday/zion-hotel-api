import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { USER_REPOSITORY } from '../../core/constants';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@Inject(USER_REPOSITORY) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create<User>(createUserDto);
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne<User>({ where: { username } });
  }

  async findOneById(id: string): Promise<User> {
    return this.userRepository.findByPk<User>(id);
  }

  async findOneByUsernameAndPhone(
    username: string,
    phone: string,
  ): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: {
        [Op.or]: [
          {
            username,
          },
          {
            phone,
          },
        ],
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll<User>();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    return this.userRepository.update<User>(updateUserDto, { where: { id } });
  }
}
