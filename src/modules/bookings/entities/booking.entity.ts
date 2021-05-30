import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Room } from '../../rooms/entities/room.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { User } from '../../users/entities/user.entity';
import { Addon } from '../../addons/entities/addon.entity';

@Table
export class Booking extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start_date: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end_date: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  booking_code: string;

  @Column({
    type: DataType.ENUM('Pending', 'Checked-In', 'Checked-Out'),
    allowNull: false,
    defaultValue: 'Pending',
  })
  status: string;

  @Column({
    type: DataType.DATE,
  })
  time_checked_in: Date;

  @Column({
    type: DataType.DATE,
  })
  time_checked_out: Date;

  @Column({
    type: DataType.ENUM('Pending', 'Complete', 'Partial'),
    allowNull: false,
    defaultValue: 'Pending',
  })
  payment_status: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  amount_due: number;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  room_id: string;
  @BelongsTo(() => Room)
  room: Room;

  @ForeignKey(() => Customer)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  customer_id: string;
  @BelongsTo(() => Customer)
  customer: Customer;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  booked_by: string;
  @BelongsTo(() => User)
  booker: User;

  // @HasMany(() => Addon)
  // addons: Addon;
}
