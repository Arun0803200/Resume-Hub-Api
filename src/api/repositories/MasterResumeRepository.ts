import { EntityRepository, Repository } from "typeorm";
import { MasterResumeModel } from "../models/MasterResumeModel";
@EntityRepository(MasterResumeModel)
export class MasterResumeRepository extends Repository<MasterResumeModel> {}
