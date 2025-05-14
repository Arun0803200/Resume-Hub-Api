import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { AdminRepository } from '../repositories/AdminRepository';
import { AdminModel } from '../models/AdminModel';
import { Brackets, getConnection, Like } from 'typeorm';
@Service()
export class AdminService {
  constructor(@OrmRepository() private adminRepository: AdminRepository) {}

  // Create Admin
  public async create(AdminData: any): Promise<any> {
    return await this.adminRepository.save(AdminData);
  }

  // Update Admin
  public async update(id: number, AdminData: AdminModel) {
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
  public async list(
    limit: number,
    offset: number,
    search: any = [],
    select: any = [],
    whereConditions: any = [],
    relation: any = [],
    count: number | boolean
  ): Promise<any> {
    const condition: any = {};

    if (select && select.length > 0) {
      condition.select = select;
    }
    condition.order = {
      createdDate: 'DESC',
    };
    if (whereConditions && whereConditions.length > 0) {
      whereConditions.forEach((data) => {
        if (data.value !== '') {
          condition.where[data.name] = data.value;
        }
      });
    }

    if (relation && relation.length > 0) {
      condition.relation;
    }

    if (search && search.length > 0) {
      search.forEach((data) => {
        const operation = data.op;
        if (operation === 'where' && data.value !== '') {
          condition.where[data.name] = data.value;
        } else if (operation === 'like' && data.value !== '') {
          condition.where[data.name] = Like('%' + data.value + '%');
        }
      });
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

  // List by query builder
  public async listByQueryBuilder(
    limit: number,
    offset: number,
    select: any = [],
    whereConditions: any = [],
    searchConditions: any = [],
    relations: any = [],
    groupBy: any = [],
    sort: any = [],
    count: boolean | number = false,
    rawQuery: boolean = false
  ): Promise<AdminModel[] | any> {
    const query: any = await getConnection()
      .getRepository(AdminModel)
      .createQueryBuilder('AdminModel');
    // Select
    if (select && select.length > 0) {
      query.select(select);
    }
    // Join
    if (relations && relations.length > 0) {
      relations.forEach((joinTb: any) => {
        query.leftJoinAndSelect(joinTb.tableName, joinTb.aliasName);
      });
    }
    // Where
    if (whereConditions && whereConditions.length > 0) {
      whereConditions.forEach((item: any) => {
        if (item.op === 'where' && item.sign === undefined) {
          query.where(item.name + ' = ' + item.value);
        } else if (item.op === 'and' && item.sign === undefined) {
          query.andWhere(item.name + ' = ' + item.value);
        } else if (item.op === 'and' && item.sign !== undefined) {
          query.andWhere(
            " '" + item.name + "'" + ' ' + item.sign + " '" + item.value + "'"
          );
        } else if (item.op === 'raw' && item.sign !== undefined) {
          query.andWhere(item.name + ' ' + item.sign + " '" + item.value + "'");
        } else if (item.op === 'or' && item.sign === undefined) {
          query.orWhere(item.name + ' = ' + item.value);
        } else if (item.op === 'IN' && item.sign === undefined) {
          query.andWhere(item.name + ' IN (' + item.value + ')');
        }
      });
    }
    // Keyword Search
    if (searchConditions && searchConditions.length > 0) {
      searchConditions.forEach((table: any) => {
        if (
          table.name &&
          table.name instanceof Array &&
          table.name.length > 0 &&
          table.value &&
          table.value instanceof Array &&
          table.value.length > 0
        ) {
          const namesArray = table.name;
          namesArray.forEach((name: string, index: number) => {
            query.andWhere(
              new Brackets((qb) => {
                const valuesArray = table.value;
                valuesArray.forEach(
                  (value: string | number, subIndex: number) => {
                    if (subIndex === 0) {
                      qb.andWhere(
                        'LOWER(' + name + ')' + ' LIKE ' + "'%" + value + "%'"
                      );
                      return;
                    }
                    qb.orWhere(
                      'LOWER(' + name + ')' + ' LIKE ' + "'%" + value + "%'"
                    );
                  }
                );
              })
            );
          });
        } else if (
          table.name &&
          table.name instanceof Array &&
          table.name.length > 0
        ) {
          query.andWhere(
            new Brackets((qb) => {
              const namesArray = table.name;
              namesArray.forEach((name: string, index: number) => {
                if (index === 0) {
                  qb.andWhere(
                    'LOWER(' + name + ')' + ' LIKE ' + "'%" + table.value + "%'"
                  );
                  return;
                }
                qb.orWhere(
                  'LOWER(' + name + ')' + ' LIKE ' + "'%" + table.value + "%'"
                );
              });
            })
          );
        } else if (
          table.value &&
          table.value instanceof Array &&
          table.value.length > 0
        ) {
          query.andWhere(
            new Brackets((qb) => {
              const valuesArray = table.value;
              valuesArray.forEach((value: string | number, index: number) => {
                if (index === 0) {
                  qb.andWhere(
                    'LOWER(' + table.name + ')' + ' LIKE ' + "'%" + value + "%'"
                  );
                  return;
                }
                qb.orWhere(
                  'LOWER(' + table.name + ')' + ' LIKE ' + "'%" + value + "%'"
                );
              });
            })
          );
        }
      });
    }
    // GroupBy
    if (groupBy && groupBy.length > 0) {
      let i = 0;
      groupBy.forEach((item: any) => {
        if (i === 0) {
          query.groupBy(item.name);
        } else {
          query.addGroupBy(item.name);
        }
        i++;
      });
    }
    // orderBy
    if (sort && sort.length > 0) {
      sort.forEach((item: any) => {
        query.orderBy('' + item.name + '', '' + item.order + '');
      });
    }
    // Limit & Offset
    if (limit && limit > 0) {
      query.take(limit);
      query.skip(offset);
    }
    if (!count) {
      if (rawQuery) {
        return query.getRawMany();
      }
      return query.getMany();
    } else {
      return query.getCount();
    }
  }
}
