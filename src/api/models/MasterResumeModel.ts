import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import moment = require("moment");

@Entity('tbl_m_resume')
export class MasterResumeModel extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'resume_data', type: 'jsonb', nullable: true })
    public resumeData: JSON;

    @Column({ name: 'created_by', type: 'int', nullable: true })
    public createdBy: number;

    @Column({ name: 'created_role', type: 'enum', enum: ['User', 'Admin'], nullable: true })
    public createdRole: 'User' | 'Admin';

    @Column({ name: 'modified_by', type: 'int', nullable: true })
    public modifiedBy: number;

    @Column({ name: 'modified_role', type: 'enum', enum: ['User', 'Admin'], nullable: true })
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
