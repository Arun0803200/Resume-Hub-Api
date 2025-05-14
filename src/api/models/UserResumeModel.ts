import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from './BaseModel';
import { MasterResumeModel } from './MasterResumeModel';
import moment = require('moment');

@Entity('tbl_user_resume')
export class UserResumeModel extends BaseModel {
  @PrimaryGeneratedColumn({ name: 'id' })
  public id: number;

  @ManyToOne(() => MasterResumeModel, (resume) => resume.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Column({ name: 'resume_id', type: 'int' })
  public resumeId: number;

  @Column({ name: 'created_by', type: 'int', nullable: true })
  public createdBy: number;

  @Column({
    name: 'created_role',
    type: 'enum',
    enum: ['User', 'Admin'],
    nullable: true,
  })
  public createdRole: 'User' | 'Admin';

  @Column({ name: 'modified_by', type: 'int', nullable: true })
  public modifiedBy: number;

  @Column({
    name: 'modified_role',
    type: 'enum',
    enum: ['User', 'Admin'],
    nullable: true,
  })
  public modifiedRole: 'User' | 'Admin';

  @BeforeInsert()
  public async createdData(): Promise<void> {
    this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  @BeforeUpdate()
  public async updateData(): Promise<void> {
    this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
  }
}
