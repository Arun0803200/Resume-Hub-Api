import { EntityRepository, Repository } from 'typeorm';
import { UserResumeModel } from '../models/UserResumeModel';
@EntityRepository(UserResumeModel)
export class UserResumeRepository extends Repository<UserResumeModel> {}
