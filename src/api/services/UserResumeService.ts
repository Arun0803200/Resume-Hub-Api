import { Service } from "typedi";
import {OrmRepository} from 'typeorm-typedi-extensions';
import { UserResumeRepository } from "../repositories/UserResumeRepository";
import { Like } from "typeorm";
import { UserResumeModel } from "../models/UserResumeModel";
@Service()
export class UserService {
    constructor(
        @OrmRepository() private userResumeRepository: UserResumeRepository
    ) {}

    // Create UserResume
    public async create(userData: any): Promise<any> {
        return await this.userResumeRepository.save(userData);
    }

    // Update UserResume
    public async update(id: number, userData: UserResumeModel)  {
        userData.id = id;
        return await this.userResumeRepository.save(userData);
    }


    // Find One The UserResume
    public async findOne(userData: any): Promise<any> {
        return await this.userResumeRepository.findOne(userData);
    }

    public async find(data: any): Promise<any> {
        return await this.userResumeRepository.find(data)
    }

    // Find All The UserResume
    public async findAll(): Promise<any> {
        return await this.userResumeRepository.find();
    }

    // List The UserResume
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
            return await this.userResumeRepository.count(condition);
        } else {
            return await this.userResumeRepository.find(condition);
        }
    }

    // Delete UserResume
    public async delete(id: number): Promise<any> {
        return await this.userResumeRepository.delete(id);
    }
}