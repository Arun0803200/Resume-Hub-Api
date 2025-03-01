import { Service } from "typedi";
import {OrmRepository} from 'typeorm-typedi-extensions';
import { AccessTokenRepository } from "../repositories/AccessTokenRepository";
import { AccessTokenModel } from "../models/AccessTokenModel";
import { Like } from "typeorm";
@Service()
export class AccessTokenService {
    constructor(
        @OrmRepository() private accessTokenRepository: AccessTokenRepository
    ) {}

    // Create AccessToken
    public async create(AccessTokenData: any): Promise<any> {
        return await this.accessTokenRepository.save(AccessTokenData);
    }

    // Update AccessToken
    public async update(id: number, AccessTokenData: AccessTokenModel)  {
        AccessTokenData.id = id;
        return await this.accessTokenRepository.save(AccessTokenData);
    }


    // Find One The AccessToken
    public async findOne(AccessTokenData: any): Promise<any> {
        return await this.accessTokenRepository.findOne(AccessTokenData);
    }

    // Find All The AccessToken
    public async findAll(): Promise<any> {
        return await this.accessTokenRepository.find();
    }

    // List The AccessToken
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
            return await this.accessTokenRepository.count(condition);
        } else {
            return await this.accessTokenRepository.find(condition);
        }
    }

    // Delete AccessToken
    public async delete(id: number): Promise<any> {
        return await this.accessTokenRepository.delete(id);
    }
}
