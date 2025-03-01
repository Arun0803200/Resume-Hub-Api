import { Column } from "typeorm";
export class BaseModel {
    @Column({name: 'created_by', type: 'int'})
    public createdBy: number;

    @Column({name: 'created_date', type: 'datetime'})
    public createdDate: string;

    @Column({name: 'modified_by', type: 'int'})
    public modifiedBy: number;

    @Column({name: 'modified_date', type: 'datetime'})
    public modifiedDate: string
}