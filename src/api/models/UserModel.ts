import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment');

@Entity('tbl_user')
export class UserModel extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @Column({ name: 'email', type: 'varchar', length: 50, unique: true })
  public email: string;

  @Column({
    name: 'mobile_number',
    type: 'varchar',
    length: 15,
    nullable: true,
  })
  public mobileNumber: string;

  @Column({ name: 'ip', type: 'varchar', nullable: true })
  public ip: string;

  @Column({ name: 'login_otp', type: 'text', nullable: true })
  public loginOtp: string;

  @Column({ name: 'user_data', type: 'jsonb', nullable: true })
  public userData: JSON;

  @Column({
    name: 'created_role',
    type: 'enum',
    enum: ['Admin', 'User'],
    nullable: true,
  })
  public createdRole: 'Admin' | 'User';

  @Column({
    name: 'modified_role',
    type: 'enum',
    enum: ['Admin', 'User'],
    nullable: true,
  })
  public modifiedRole: 'Admin' | 'User';

  @BeforeInsert()
  public async createdData(): Promise<void> {
    this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateData(): Promise<void> {
    this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }
}
