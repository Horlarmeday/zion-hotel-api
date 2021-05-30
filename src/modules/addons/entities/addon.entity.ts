import {
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Addon extends Model {
  @Default(DataType.UUIDV4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DECIMAL(12, 2),
    allowNull: false,
  })
  price: number;
}
