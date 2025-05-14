import { EntityRepository, Repository } from 'typeorm';
import { AdminModel } from '../models/AdminModel';
@EntityRepository(AdminModel)
export class AdminRepository extends Repository<AdminModel> {}
