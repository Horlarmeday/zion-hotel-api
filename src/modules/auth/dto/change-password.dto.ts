import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly old_password: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  readonly new_password: string;

  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  readonly confirm_password: string;
}
