import { Service } from "typedi";
import {OrmRepository} from 'typeorm-typedi-extensions';
import { AdminRepository } from "../repositories/AdminRepository";
import { AdminModel } from "../models/AdminModel";
import { Like } from "typeorm";
@Service()
export class AdminService {
    constructor(
        @OrmRepository() private adminRepository: AdminRepository
    ) {}

    // Create Admin
    public async create(AdminData: any): Promise<any> {
        return await this.adminRepository.save(AdminData);
    }

    // Update Admin
    public async update(id: number, AdminData: AdminModel)  {
        AdminData.id = id;
        return await this.adminRepository.save(AdminData);
    }


    // Find One The Admin
    public async findOne(AdminData: any): Promise<any> {
        return await this.adminRepository.findOne(AdminData);
    }

    // Find All The Admin
    public async findAll(): Promise<any> {
        return await this.adminRepository.find();
    }

    // List The Admin
    public async list(limit: number, offset: number, search: any = [], select: any = [], whereConditions: any = [], relation: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.order = {
            createdDate: 'DESC'
        }
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((data) => {
                if (data.value!=='') {
                    condition.where[data.name] = data.value;
                }
            })
        }

        if (relation && relation.length > 0) {
            condition.relation;
        }

        if (search && search.length > 0) {
            search.forEach((data) => {
                const operation = data.op;
                if (operation === 'where' && data.value !== '') {
                    condition.where[data.name] = data.value;
                }
                else if (operation === 'like' && data.value !== '') {
                    condition.where[data.name] = Like('%' + data.value + '%');
                }
            })
        }

        if (limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return await this.adminRepository.count(condition);
        } else {
            return await this.adminRepository.find(condition);
        }
    }

    // Delete Admin
    public async delete(id: number): Promise<any> {
        return await this.adminRepository.delete(id);
    }
}
