import {IsInt, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category_id: string;

  @IsInt()
  @IsNotEmpty()
  max_guest: number;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
