import { Table, Column, Model, BelongsTo, AllowNull, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';

@Table({timestamps: true, paranoid: true})
export class Session extends Model<Session> {

  @Column({primaryKey: true, autoIncrement: true})
  id: number;

  @AllowNull(false)
  @Column
  name: String;

  @AllowNull(false)
  @Column
  start: Date;

  @Column
  end: Date;

  @AllowNull(false)
  @Column
  active: boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  user: User;
}