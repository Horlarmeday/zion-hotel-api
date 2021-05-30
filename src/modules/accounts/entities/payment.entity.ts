import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Booking } from '../../bookings/entities/booking.entity';

@Table
export class Payment extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    defaultValue: 0,
  })
  amount: number;

  @Column({
    type: DataType.STRING,
  })
  mode_of_payment: number;

  @ForeignKey(() => Booking)
  @Column({
    type: DataType.UUID,
  })
  booking_id: string;
  @BelongsTo(() => Booking)
  booking: Booking;
}
