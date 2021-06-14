import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { USER_REPOSITORY } from '../../core/constants';
import { Op } from 'sequelize';
import { GeneralHelpers } from '../../common/helpers/general.helpers';
import { QueryDto } from '../../core/pipes/query-dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    private readonly generalHelper: GeneralHelpers,
  ) {}

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

  async findAll(
    queryDto: QueryDto,
  ): Promise<{
    total: any;
    pages: number;
    perPage: number;
    docs: any;
    currentPage: number;
  }> {
    let users;
    const { currentPage, pageLimit, search } = queryDto;

    const { limit, offset } = this.generalHelper.getPagination(
      +currentPage,
      +pageLimit,
    );

    if (search) {
      users = await this.searchUsers(search, limit, offset);
    } else {
      users = await this.getUsers(limit, offset);
    }

    return this.generalHelper.paginate(users, currentPage, limit);
  }

  async searchUsers(search: string, limit: number, offset: number) {
    return await this.userRepository.findAndCountAll<User>({
      limit: limit,
      offset: offset,
      attributes: { exclude: ['password'] },
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
    });
  }

  async getUsers(limit: number, offset: number) {
    return await this.userRepository.findAndCountAll<User>({
      limit: limit,
      offset: offset,
      attributes: { exclude: ['password'] },
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<[number, User[]]> {
    return this.userRepository.update<User>(updateUserDto, { where: { id } });
  }
}
