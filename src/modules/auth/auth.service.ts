import {BadRequestException, Injectable, NotFoundException,} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UsersService} from '../users/users.service';
import {JwtPayload} from './interfaces/jwt-payload';
import {JwtService} from '@nestjs/jwt';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {User} from '../users/entities/user.entity';
import {GeneralHelpers} from '../../common/helpers/general.helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly generalHelper: GeneralHelpers,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // find if user exist with this username
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await AuthService.comparePassword(pass, user.password))) {
      const { name, username, id } = user;
      return { name, username, id };
    }
    return null;
  }

  async login(user: JwtPayload) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  async create(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async changePassword(payload: any, userId: string): Promise<User> {
    const { new_password, old_password, confirm_password } = payload;

    const is_confirm_password_same = AuthService.validateUserPassword(
      new_password,
      confirm_password,
    );

    if (is_confirm_password_same) {
      const user = await this.usersService.findOneById(userId);

      const isSamePassword = await AuthService.comparePassword(
        old_password,
        user.password,
      );
      if (!isSamePassword)
        throw new BadRequestException('Old password not correct');

      user.password = new_password;
      await user.save();
      return user;
    }

    throw new BadRequestException(
      'Your new password must be equal with confirm password',
    );
  }

  async forgotPassword(username: string): Promise<void> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) throw new NotFoundException('No user exists with this username');

    user.password = this.generalHelper.generateRandomCharacters(9);
    await user.save();
    //todo: send sms to user to generate a new password
  }

  private async generateToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload);
  }

  private static validateUserPassword(
    new_password: string,
    confirm_password: string,
  ) {
    return new_password === confirm_password;
  }

  private static async comparePassword(
    enteredPassword: string,
    dbPassword: string,
  ) {
    return bcrypt.compare(enteredPassword, dbPassword);
  }
}
