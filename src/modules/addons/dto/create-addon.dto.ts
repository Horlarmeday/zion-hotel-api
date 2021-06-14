import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  id?: string;
}
