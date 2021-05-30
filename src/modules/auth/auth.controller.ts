import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IsUserActive } from './guards/isUserActive.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @UseGuards(IsUserActive)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    const result = await this.authService.login(req.user);
    return { message: 'User authenticated', result };
  }

  @UseGuards(DoesUserExist)
  @Post('create')
  async register(@Body() createUserDto: CreateUserDto) {
    const result = await this.authService.create(createUserDto);
    return { message: 'Data Saved', result };
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req,
  ) {
    const result = await this.authService.changePassword(
      changePasswordDto,
      req.user.sub,
    );
    return { message: 'Password changed!', result };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() username: string) {
    await this.authService.forgotPassword(username);
    return {
      message: 'A new password has been sent to your email',
      result: null,
    };
  }
}
