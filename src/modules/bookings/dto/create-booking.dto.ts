import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateBookingDto {
  @IsDate()
  @IsNotEmpty()
  start_date: Date;

  @IsDate()
  @IsNotEmpty()
  end_date: Date;

  @IsString()
  @IsNotEmpty()
  room_id: string;

  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsString()
  @IsOptional()
  add_on_id: string;

  @IsNumber()
  @IsNotEmpty()
  amount_due: number;
}
