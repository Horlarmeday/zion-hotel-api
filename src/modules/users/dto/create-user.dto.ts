import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  readonly phone: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsOptional()
  readonly user_status?: string;
}
