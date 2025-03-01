import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import moment = require("moment");

@Entity('tbl_access_token')
export class AccessTokenModel extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number;

    @Column({ name: 'token', type: 'text' })
    public token: string;

    @Column({ name: 'created_by', type: 'int', nullable: true })
    public createdBy: number;

    @Column({ name: 'created_role', type: 'enum', enum: ['User', 'Admin'], nullable: true })
    public createdRole: 'User' | 'Admin';

    @BeforeInsert()
    public async createdData(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
