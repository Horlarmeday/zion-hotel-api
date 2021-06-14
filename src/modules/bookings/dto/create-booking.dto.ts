import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookingDto {
  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @IsDateString()
  @IsNotEmpty()
  end_date: Date;

  @IsString()
  @IsNotEmpty()
  room_id: string;

  @IsString()
  @IsNotEmpty()
  customer_id: string;

  @IsArray()
  @IsOptional()
  addons: Array<any>;

  @IsNumber()
  @IsNotEmpty()
  amount_due: number;

  @IsNumber()
  @IsNotEmpty()
  amount_paid: number;

  @IsString()
  @IsNotEmpty()
  mode_of_payment: string;
}
