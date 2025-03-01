import { Service } from "typedi";
import {OrmRepository} from 'typeorm-typedi-extensions';
import { MasterResumeRepository } from "../repositories/MasterResumeRepository";
import { MasterResumeModel } from "../models/MasterResumeModel";
import { Like } from "typeorm";
@Service()
export class MasterResumeService {
    constructor(
        @OrmRepository() private masterResumeRepository: MasterResumeRepository
    ) {}

    // Create MasterResume
    public async create(MasterResumeData: any): Promise<any> {
        return await this.masterResumeRepository.save(MasterResumeData);
    }

    // Update MasterResume
    public async update(id: number, MasterResumeData: MasterResumeModel)  {
        MasterResumeData.id = id;
        return await this.masterResumeRepository.save(MasterResumeData);
    }


    // Find One The MasterResume
    public async findOne(MasterResumeData: any): Promise<any> {
        return await this.masterResumeRepository.findOne(MasterResumeData);
    }

    // Find All The MasterResume
    public async findAll(): Promise<any> {
        return await this.masterResumeRepository.find();
    }

    // List The MasterResume
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
            return await this.masterResumeRepository.count(condition);
        } else {
            return await this.masterResumeRepository.find(condition);
        }
    }

    // Delete MasterResume
    public async delete(id: number): Promise<any> {
        return await this.masterResumeRepository.delete(id);
    }
}
