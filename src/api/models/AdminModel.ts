import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import moment = require("moment");
import bcrypt = require('bcrypt');


@Entity('tbl_admin')
export class AdminModel extends BaseModel {
        public static hashPassword(password: string) {
            return new Promise((resolve: any, reject: any) => {
                bcrypt.hash(password, 10, (err, data) => {
                    if (err) {
                        reject(err);
                    } 
                    resolve(data);
                })
            })
        }
    
        public static comparePassword(password: any, hasPassword: any) {
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, hasPassword, (err, data)=>{
                    if(err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                })
            });
        }
    @PrimaryGeneratedColumn({name: 'id'})
    public id: number;

    @Column({name: 'email', type: 'varchar'})
    public email: string;

    @Column({name: 'password', type: 'varchar'})
    public password: string;

    @Column({name: 'mobile_number', type: 'varchar', length: 15})
    public mobileNumber: number;

    @Column({name: 'admin_data', type: 'jsonb'})
    public adminData: JSON;

    @BeforeInsert()
        public async createdData(): Promise<any> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    
    }

    @BeforeUpdate()
        public async updateData(): Promise<any> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}