import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAddonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
